import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
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
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); 
        sessionStorage.removeItem('isAuthenticated');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
