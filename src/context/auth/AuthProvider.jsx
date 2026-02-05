import { createContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../../firebaseConfig.js";

export const AuthContext = createContext({
    isLoading:false,
    isAuthenticated:false,
    user:null,
    login:async(email,password) => {},
});


export default function AuthProvider({children}) {

    const [authState,setAuthState] = useState({user:null});

    const login = async(email,password) =>{

        try{
            
            setIsLoading(true);
            const response = await signInWithEmailAndPassword(auth,email,password);
            setAuthState({user:response.user});

        }catch(err){
            console.log(`Error during login: ${err.message}`)
        }finally{
            setIsLoading(false);
    }
    }

    const [isLoading,setIsLoading] = useState(false);

    const contextValue = {
        isAuthenticated:authState.user,
        isLoading,
        user:authState.user,
        login,
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}