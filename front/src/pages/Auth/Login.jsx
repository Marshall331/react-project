import { useEffect } from 'react';
import SignIn from '@/components/Auth/SignIn/SignIn';
import Confirmation from '../../utils/Confirmation';
import { useLocation } from 'react-router-dom';

function Login() {

    // Shows a confirmation dialog after a redirection from the creation account page or after a password reset
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const createdAccount = queryParams.get('createdAccount') === 'true';
    const resetPassword = queryParams.get('resetPassword') === 'true';

    useEffect(() => {
        document.title = 'Connexion';
        return () => {
            document.title = '';
        };
    }, []);

    return (
        <>
            <SignIn />
            {
                (createdAccount ? <Confirmation text={"Votre compte a bien été créé, vous pouvez à présent vous connectez."} /> : "")
            }
            {
                (resetPassword ? <Confirmation text={"Un e-mail vous a été envoyé pour réintialiser votre mot de passe."} /> : "")
            }
        </>
    );
}

export default Login;
