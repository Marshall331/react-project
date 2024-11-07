import { useEffect } from 'react';
import Confirmation from '../../utils/Confirmation';
import { useLocation } from 'react-router-dom';
import SignInForm from '../../components/Auth/SignIn/SignInForm';

function Login() {

    // Shows a confirmation dialog after a redirection from the creation account page
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const createdAccount = queryParams.get('createdAccount') === 'true';

    useEffect(() => {
        document.title = 'Connexion';
        return () => {
            document.title = '';
        };
    }, []);

    return (
        <>
            <SignInForm />
            {
                (createdAccount ? <Confirmation text={"Votre compte a bien été créé, vous pouvez à présent vous connectez."} /> : "")
            }
        </>
    );
}

export default Login;
