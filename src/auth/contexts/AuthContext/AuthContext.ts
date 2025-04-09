import { createContext } from "react";

export type TAuthContext = {
    userName:string;
    isAuthenticated: boolean;
    login: ()=>void;
    logout: ()=>void;    
}

const AuthContext = createContext<TAuthContext>({
    userName:"",
    isAuthenticated: false,
    login: function (): void {
        throw new Error("Function not implemented.");
    },
    logout: function (): void {
        throw new Error("Function not implemented.");
    }
})

export default AuthContext;