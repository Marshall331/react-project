import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

function ForgotPassword({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          handleClose();
        },
        sx: { backgroundImage: 'none' },
      }}
    >
      <Typography
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginTop: "0.25em", textAlign: 'center' }}
      >
        Réinitialiser le mot de passe
      </Typography>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Entrez l&apos;adresse e-mail de votre compte, et nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </DialogContentText>
        <FormControl>
          <TextField
            // error={emailError}
            // helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            label="E-mail"
            variant="outlined"
            autoComplete="email"
            fullWidth
            color="primary"
            sx={{ ariaLabel: 'email' }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Annuler</Button>
        <Button variant="contained" type="submit">
          Continuer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
