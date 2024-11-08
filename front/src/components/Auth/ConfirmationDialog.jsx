import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export default function ConfirmationDialog({ open, text, redirectPath }) {

    return (
        <Dialog
            open={open}
            PaperProps={{
                sx: { backgroundImage: 'none' },
            }}
        >
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}
                    color={'success'}>
                    <CheckIcon />
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button
                    type='submit'
                    color="primary"
                    variant="contained"
                    size='medium'
                    fullWidth
                    href={redirectPath}
                >
                    Se connecter
                </Button>
            </DialogActions>
        </Dialog >
    );
}