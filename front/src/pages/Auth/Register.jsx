import { useEffect } from 'react';
import SignUpForm from '../../components/Auth/SignUp/SignUpForm';

function Register() {

    useEffect(() => {
        document.title = 'Créer un compte';
        return () => {
            document.title = '';
        };
    }, []);


    return (
        <>
            <SignUpForm />
        </>
    );
}

export default Register;
