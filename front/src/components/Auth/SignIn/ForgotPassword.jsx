import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

function ForgotPassword({ open, handleClose }) {

  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const handleSubmit = async (email) => {
    setLoading(true)

    console.log(email)

    // const access = {
    //   email,
    // }

    try {
      // const response = await loginToApp(access)

      // if (response.status === 200) {
        // setLoading(false);
        // setConnectionFailed(false);
        // setConnectionFailedMessage('');

        // login(rememberMe)
      // }
    } finally {
      setLoading(false);
    }
  }

  const validateInputs = () => {

    const email = document.getElementById('emailReset').value;

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Merci de saisir une adresse e-mail valide.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (isValid) {
      handleSubmit(email)
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
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
          Entrez l&apos;adresse e-mail de votre compte et nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </DialogContentText>
        <FormControl>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="emailReset"
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
        <LoadingButton
            type='submit'
            color="primary"
            onClick={validateInputs}
            loading={loading}
            variant="contained"
            size='medium'
          >
            Réinitialiser
          </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
