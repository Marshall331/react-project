import { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true' || sessionStorage.getItem('isAuthenticated') === 'true';
    });

    const login = (rememberMe) => {
        setIsAuthenticated(true);
        if (rememberMe) {
            localStorage.setItem('isAuthenticated', 'true');
            sessionStorage.removeItem('isAuthenticated');
        } else {
            sessionStorage.setItem('isAuthenticated', 'true');
            localStorage.removeItem('isAuthenticated');
        }
        navigate("/");
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const createAccount = () => {
        navigate('/');

        setTimeout(() => {
            navigate('/login?createdAccount=true');
        }, 100);
    };

    const resetPassword = () => {
        // navigate('/');

        // setTimeout(() => {
        //     navigate('/login?resetPassword=true');
        // }, 100);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, createAccount, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};
