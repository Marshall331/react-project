import { useEffect } from 'react';
import Typography from '@mui/material/Typography';

function Home() {

    useEffect(() => {
        document.title = 'Accueil';
        console.log('Le composant Accueil est monté');

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
