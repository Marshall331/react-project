import { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true' || sessionStorage.getItem('isAuthenticated') === 'true';
    });

    const [user, setUser] = useState(() => {
        const user = localStorage.getItem('user') || sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });

    const login = (user, rememberMe) => {
        setIsAuthenticated(true);
        setUser(user);

        if (rememberMe) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(user));
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('user');
        } else {
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('user', JSON.stringify(user));
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
        }
        
        navigate("/");
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
