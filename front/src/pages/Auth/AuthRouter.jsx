import { Routes, Route } from 'react-router-dom';
import Login from './Login';


const AuthRouter = () => {
    return (
        <Routes>
            <Route path='login' element={Login} ></Route>
            <Route path='*' element={Login} ></Route>
        </Routes>
    )
}

export default AuthRouter