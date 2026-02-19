import { createContext, useEffect, useState } from "react";
import { auth } from "../../config/firebaseConfig.js";
import { createDBUser, getUserById, userLogin, userRegister } from "../../services/userService.js";
import { onAuthStateChanged } from "firebase/auth";

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
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            user ? setAuthState({user:user}) : setAuthState({user:null});
        });
        return () => unsubscribe();
    },[])

    const login = async(email,password) =>{
        
        try{

            setError(null);
            setIsLoading(true);

            const user = await userLogin(email,password);
            const findUser = await getUserById(user.user.uid);

            setAuthState({user:findUser});

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
        setAuthState({user:null});
    }


    const contextValue = {
        isAuthenticated:authState.user,
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
           