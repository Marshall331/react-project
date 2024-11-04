import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';

export default function Loading() {
    return (
        <div className="container mt-4">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <LinearProgress sx={{ width: '100%', p: 0.5, }} />
            </Box>
        </div>
    );
}