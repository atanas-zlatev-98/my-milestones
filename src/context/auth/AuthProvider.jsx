import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../../firebaseConfig.js";
import { createDBUser, getUserById } from "../../services/userService.js";
import { usePersistedState } from "../../hooks/usePersistedState.js";

export const AuthContext = createContext({
    isLoading:false,
    isAuthenticated:false,
    user:null,
    login:async(email,password) => {},
    register:async(name,email,password,profilePictureUrl) => {},
    logout:async() => {},
});


export default function AuthProvider({children}) {

    const [authState,setAuthState] = usePersistedState('auth',{user:null,authToken:null});
    const [isLoading,setIsLoading] = useState(false);

    const login = async(email,password) =>{

        try{
            
            setIsLoading(true);
            const response = await signInWithEmailAndPassword(auth,email,password);

            const findUser = await getUserById(response.user.uid);
            setAuthState({user:findUser,authToken:response.user.accessToken});

        }catch(err){
            console.log(`Error during login: ${err.message}`)
        }finally{
            setIsLoading(false);
    }
    }

    const register = async(name,email,password,profilePictureUrl) =>{

        try{    

            setIsLoading(true);
            const response = await createUserWithEmailAndPassword(auth,email,password);
            const newUser = response.user;

            await createDBUser(newUser.uid,name,email,profilePictureUrl);
            
            const findUser = await getUserById(newUser.uid);
            
            setAuthState({user:findUser,authToken:newUser.accessToken});
            
        }catch(err){
            console.log(`Error during registration: ${err.message}`)
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