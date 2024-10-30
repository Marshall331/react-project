import { useEffect } from 'react';
import Typography from '@mui/material/Typography';

function Home() {

    useEffect(() => {
        document.title = 'Accueil';
        return () => {
            document.title = '';
        };
    }, []);

    return (
        <Typography>
            Home page works!
        </Typography>
    );
}

export default Home;
