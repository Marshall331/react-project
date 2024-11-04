import { useEffect } from 'react';
import Typography from '@mui/material/Typography';

function Multiplayer() {

    useEffect(() => {
        document.title = 'Mode multijoueur';
        console.log('Le composant multijoueur est monté');

        return () => {
            document.title = '';
        };
    }, []);

    return (
        <Typography>
            Multiplayer works
        </Typography>
    );
}

export default Multiplayer;