import { useEffect } from 'react';
import Typography from '@mui/material/Typography';

function Users() {

    useEffect(() => {
        document.title = 'Utilisateurs';
        console.log('Le composant Utilisateurs est monté');

        return () => {
            document.title = '';
        };
    }, []);

    return (
        <Typography>
            Users page works!
        </Typography>
    );
}

export default Users;
