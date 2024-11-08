import { useEffect } from 'react';
import SignInForm from '../../components/Auth/SignIn/SignInForm';

function Login() {

    useEffect(() => {
        document.title = 'Connexion';
        return () => {
            document.title = '';
        };
    }, []);

    return (
        <>
            <SignInForm />
        </>
    );
}

export default Login;
