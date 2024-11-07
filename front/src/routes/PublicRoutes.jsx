import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import PasswordReset from '../pages/Auth/PasswordReset';

export default function PublicRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password/:token" element={<PasswordReset />} />
        </Routes>
    );
}