import { useEffect } from 'react';
import SignIn from '@/components/Auth/SignIn/SignIn';
import CreationConfirmation from '../../components/Auth/SignUp/CreationConfirmation';
import { useLocation } from 'react-router-dom';

function Login() {

    // Shows a confirmation dialog after a redirection from the creation account page
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const createdAccount = queryParams.get('created_account') === 'true';

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
                (createdAccount ? <CreationConfirmation /> : "")
            }
        </>
    );
}

export default Login;
