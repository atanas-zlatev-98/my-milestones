import { createContext, useState } from "react";

export const AuthContext = createContext({
    isLoading:false,
    isAuthenticated:false,
    user:null,
    auth:null,
});


export default function AuthProvider({children}) {

    const [authState,setAuthState] = useState({
        isLoading:false,
        isAuthenticated:false,
        user:null,
        auth:null,
    });

    const [isLoading,setIsLoading] = useState(false);

    const contextValue = {
        isAuthenticated:authState.isAuthenticated,
        isLoading,
        user:authState.user,
        auth:authState.auth,
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}