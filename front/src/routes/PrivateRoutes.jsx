import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Solo from '../pages/Solo';
import Multiplayer from '../pages/Multiplayer';
import Users from '../pages/Admin/Users';


export default function PrivateRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/solo" element={<Solo />} />
            <Route path="/multiplayer" element={<Multiplayer />} />
            <Route path="/admin/users" element={<Users />} />
        </Routes>
    );
}