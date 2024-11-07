import { useEffect } from 'react';
import PasswordResetForm from '../../components/Auth/PasswordReset/PasswordResetForm';
import { useParams } from 'react-router-dom';

function PasswordReset() {
    const { token } = useParams();

    useEffect(() => {
        document.title = 'Réinitialiser mon mot de passe';
        return () => {
            document.title = '';
        };
    }, []);


    return (
        <>
            <PasswordResetForm resetToken={token} />
        </>
    );
}

export default PasswordReset;
