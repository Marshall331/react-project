import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Button, Link } from '@mui/material';

export default function ConfirmationDialog({ open, handleClose }) {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: { backgroundImage: 'none' },
            }}
        >

            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText>
                    Votre mot de passe a bien été reinitialisé !
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Link
                    href="/login"
                    sx={{ alignSelf: 'center' }}
                >
                    <Button
                        type='submit'
                        color="primary"
                        variant="contained"
                        size='medium'
                        fullWidth
                    >
                        Se connecter
                    </Button>
                </Link>
            </DialogActions>
        </Dialog >

    );
}