import { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ForgotPassword from './ForgotPasswordDialog';
import { useAuth } from '@/hooks/useAuth';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormCard, FormContainer } from '../FormContainer';
import ThemeSwitch from '../../Theme/ThemeSwitch';
import { login as loginAPI } from '@/services/AuthService.jsx'
import Confirmation from '../../../utils/Confirmation';

export default function SignInForm() {

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [connectionFailed, setConnectionFailed] = useState(false);
  const [connectionFailedMessage, setConnectionFailedMessage] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [open, setOpen] = useState(false);
  const [resetEmailSend, setResetEmailSend] = useState(false);

  const handleClickOpen = () => {
    setResetEmailSend(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailSend = () => {
    setResetEmailSend(true);
  }


  const handleSubmit = async (email, password, rememberMe) => {
    setLoading(true)

    const access = {
      email,
      password
    }

    try {
      const response = await loginAPI(access)

      if (response.status === 200) {
        setLoading(false);
        setConnectionFailed(false);
        setConnectionFailedMessage('');

        login(response.data, rememberMe)
      }
    } catch (error) {
      setLoading(false);
      setConnectionFailed(true);
      if (error.response) {
        console.log(error)

        if (error.response.data) {
          setConnectionFailedMessage(error.response.data)

          if (error.response.data.includes("compte")) {
            setEmailError(true)
            setEmailErrorMessage('Aucun compte associé à cet e-mail.\n')
          }
          if (error.response.data.includes("mot de passe")) {
            setPasswordError(true)
            setPasswordErrorMessage('Mot de passe du compte incorrect.\n')
          }

        } else {
          setConnectionFailedMessage("La connexion a échoué.");
        }

      } else {
        setConnectionFailedMessage("Connexion au serveur impossible.");
      }
    } finally {
      setLoading(false);
    }
  }

  const validateInputs = () => {
    setConnectionFailed(false);
    setConnectionFailedMessage('');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Merci de saisir une adresse e-mail valide.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 4) {
      setPasswordError(true);
      setPasswordErrorMessage('Le mot de passe doit contenir au minimum 4 caractères.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (isValid) {
      handleSubmit(email, password, rememberMe)
    }
  };

  return (
    <FormContainer direction="column" justifyContent="space-between">

      {
        (resetEmailSend ? <Confirmation text={"Un e-mail vous a été envoyé pour réinitialiser votre mot de passe."} /> : "")
      }

      <ThemeSwitch />

      <FormCard variant="outlined">
        <Typography
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
        >
          Connexion
        </Typography>
        {connectionFailed ? <Alert severity="warning">{connectionFailedMessage}</Alert> : ""}
        <Box
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
            marginTop: '1em',
          }}
        >
          <FormControl>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              label="E-mail"
              variant="outlined"
              autoComplete="email"
              fullWidth
              color={emailError ? 'error' : 'primary'}
              sx={{ ariaLabel: 'email' }}
            />
          </FormControl>
          <FormControl>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              fullWidth
              label="Mot de passe"
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={<Checkbox id="rememberMe" value="remember" color="primary" />}
              label="Se souvenir de moi"
            />
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              Mot de passe oublié ?
            </Link>
          </Box>

          <ForgotPassword open={open} handleClose={handleClose} handleEmailSend={handleEmailSend} />
          <LoadingButton
            type='submit'
            color="primary"
            onClick={validateInputs}
            loading={loading}
            variant="contained"
            size='large'
          >
            Se connecter
          </LoadingButton>
          <Typography sx={{ textAlign: 'center' }}>
            Pas de compte ?{' '}
            <span>
              <Link
                href="/register"
                sx={{ alignSelf: 'center' }}
              >
                Créer un compte
              </Link>
            </span>
          </Typography>
        </Box>
      </FormCard>
    </FormContainer>
  );
}