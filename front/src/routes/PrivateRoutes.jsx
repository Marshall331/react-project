import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Solo from '../pages/Solo';
import Multiplayer from '../pages/Multiplayer';


export default function PrivateRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solo" element={<Solo />} />
            <Route path="/multiplayer" element={<Multiplayer />} />
        </Routes>
    );
}