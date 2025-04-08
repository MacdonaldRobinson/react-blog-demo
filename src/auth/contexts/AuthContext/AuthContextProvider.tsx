import useFirebaseAuth from "../../../firebase/hooks/useFirebaseAuth/useFirebaseAuth";
import AuthContext, { TAuthContext } from "./AuthContext";

export type TAuthContextProvider = {
    children: React.ReactNode;
};

const AuthContextProvider = ({ children }: TAuthContextProvider) => {
    const { login, logout, user } = useFirebaseAuth();

    const handleLogin = async () => {
        await login();
    };

    const handleLogout = async () => {
        await logout();
    };

    const newAuthContext: TAuthContext = {
        useName: user?.user.displayName ?? "",
        isAuthenticated: !!user,
        login: handleLogin,
        logout: handleLogout,
    };

    return (
        <AuthContext.Provider value={newAuthContext}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
