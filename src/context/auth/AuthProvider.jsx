import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../../firebaseConfig.js";
import { setDoc, doc } from "firebase/firestore";

export const AuthContext = createContext({
    isLoading:false,
    isAuthenticated:false,
    user:null,
    login:async(email,password) => {},
    register:async(name,email,password) => {}
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

    const register = async(name,email,password) =>{

        try{    

            setIsLoading(true);
            const response = await createUserWithEmailAndPassword(auth,email,password);
            const newUser = response.user;

            await setDoc(doc(db,"users",newUser.uid),{
                name,
                email,
                projects:[],
                createdAt: new Date(),
            })

              setAuthState({user:newUser});
            
        }catch(err){
            console.log(`Error during registration: ${err.message}`)
        }finally{
            setIsLoading(false)
        }
    }

    const [isLoading,setIsLoading] = useState(false);

    const contextValue = {
        isAuthenticated:authState.user,
        isLoading,
        user:authState.user,
        login,
        register,
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}