import { useEffect } from 'react';
import SignIn from '@/components/Auth/SignIn/SignIn';

function Login() {

    useEffect(() => {
        document.title = 'Connexion';
        return () => {
            document.title = '';
        };
    }, []);

    return (
        <>
            <SignIn />
        </>
    );
}

export default Login;
