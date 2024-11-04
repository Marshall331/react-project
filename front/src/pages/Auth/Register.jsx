import { useEffect } from 'react';
import SignUp from '@/components/Auth/SignUp/SignUp';

function Register() {

    useEffect(() => {
        document.title = 'Créer un compte';
        return () => {
            document.title = '';
        };
    }, []);


    return (
        <>
            <SignUp />
        </>
    );
}

export default Register;
