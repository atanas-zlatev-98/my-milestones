import { createContext, useEffect, useState } from "react";
import { auth } from "../../config/firebaseConfig.js";
import { createDBUser, getUserById, userLogin, userRegister } from "../../services/userService.js";
import { onAuthStateChanged,signOut } from "firebase/auth";
import { getFirebaseAuthErrorMessage } from "../../config/firebaseMessage.js";

export const AuthContext = createContext({
    isLoading:null,
    isAuthenticated:false,
    user:null,
    error:null,  
    clearErrors: () => {},  
    login:async(email,password) => {},
    register:async(name,email,password,profilePictureUrl) => {},
    logout:async() => {},
});


export default function AuthProvider({children}) {

    const [authState,setAuthState] = useState({user:null});
    const [isLoading,setIsLoading] = useState(true);

    const [error,setError] = useState({
        loginError:null,
        registerError:null,
        logoutError:null,
    });

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,async (user)=>{
            if(user){
                const dbUserInfo = await getUserById(user.uid);
                setAuthState({user:dbUserInfo});
            } else {
                setAuthState({user:null});
            }
             setIsLoading(false);
        });
        return () => unsubscribe();
    },[])

    const login = async(email,password) =>{
        
        try{

            // setError({loginError:null,registerError:null,logoutError:null});

            const user = await userLogin(email,password);
            const dbUserInfo = await getUserById(user.uid);

            setAuthState({user:dbUserInfo});

        }catch(err){
            setError({loginError:'Invalid email or password!',registerError:null,logoutError:null});
        }
}

    const register = async(name,email,password,profilePictureUrl) =>{

        try{
                
            const user = await userRegister(email,password);
            const createdUser = await createDBUser(user.uid,name,email,profilePictureUrl);
            
            setAuthState({user:createdUser});
            
        }catch(err){
            setError({registerError:getFirebaseAuthErrorMessage(err),loginError:null,logoutError:null});
        }
    }

    const logout = async() =>{
        try{
            await signOut(auth);
            setAuthState({user:null});
        }catch(err){
            setError({logoutError:'Failed to logout. Please try again.', loginError:null, registerError:null});
        }
    }


    const contextValue = {
        isAuthenticated:!!authState.user,
        isLoading,
        user:authState.user,
        error,
        clearErrors: () => setError({loginError:null,registerError:null}),
        login,
        register,
        logout,

    }

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
           