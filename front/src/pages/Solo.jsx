import {useEffect} from 'react';
import Typography from '@mui/material/Typography';

function Solo() {

    useEffect(() => {
        document.title = 'Mode solo';
        return () => {
            document.title = '';
        };
    }, []);

    return (
        <Typography>
            Solo page works!
        </Typography>
    );
}

export default Solo;