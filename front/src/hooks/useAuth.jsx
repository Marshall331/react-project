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
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
