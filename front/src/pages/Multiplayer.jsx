import { useEffect } from 'react';
import Typography from '@mui/material/Typography';

function Multiplayer() {

    useEffect(() => {
        document.title = 'Mode multijoueurs';
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