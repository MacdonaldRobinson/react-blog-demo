import useAuthContext from "../../hooks/useAuthContext";
import { AuthButtonWrapper, LoggedInWrapper } from "./AuthButton.styles";

const AuthButton = () => {
    const { isAuthenticated, login, logout, useName } = useAuthContext();

    const handleLogin = async () => {
        await login();
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <AuthButtonWrapper>
            {!isAuthenticated && <button onClick={handleLogin}>Login</button>}
            {isAuthenticated && (
                <LoggedInWrapper>
                    <div>Welcome {useName}</div>
                    <button onClick={handleLogout}>Logout</button>
                </LoggedInWrapper>
            )}
        </AuthButtonWrapper>
    );
};

export default AuthButton;
