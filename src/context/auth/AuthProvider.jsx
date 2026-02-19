import { createContext, useEffect, useState } from "react";
import { auth } from "../../config/firebaseConfig.js";
import { createDBUser, getUserById, userLogin, userRegister } from "../../services/userService.js";
import { onAuthStateChanged,signOut } from "firebase/auth";

export const AuthContext = createContext({
    isLoading:false,
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
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,async (user)=>{
            if(user){
                const dbUserInfo = await getUserById(user.uid);
                setAuthState({user:dbUserInfo});
            } else {
                setAuthState({user:null});
            }
        });
        return () => unsubscribe();
    },[])

    const login = async(email,password) =>{
        
        try{

            setError(null);
            setIsLoading(true);

            const user = await userLogin(email,password);
            const dbUserInfo = await getUserById(user.uid);

            setAuthState({user:dbUserInfo});

        }catch(err){
            setError('Invalid email or password!');
            console.log(err)
        }finally{
            setIsLoading(false);
    }
}

    const register = async(name,email,password,profilePictureUrl) =>{
        
        try{    
            setIsLoading(true);

            const user = await userRegister(email,password);
            const createdUser = await createDBUser(user.uid,name,email,profilePictureUrl);
            
            setAuthState({user:createdUser});
            
        }catch(err){
            setError('Registration failed!', err.message);
        }finally{
            setIsLoading(false)
        }
    }

    const logout = async() =>{
        try{
            await signOut(auth);
            setAuthState({user:null});
        }catch(err){
            setError('Logout failed!', err.message);
        }
    }


    const contextValue = {
        isAuthenticated:!!authState.user,
        isLoading,
        user:authState.user,
        error,
        clearErrors: () => setError(null),
        login,
        register,
        logout
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
           