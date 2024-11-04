import { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 99% 99%, hsla(210, 100%, 16%, 0.9), hsl(220, 80%, 5%))',
    }),
  },
}));

export default function SignIn({ darkModeChecked, setCheckedDarkMode }) {

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [connectionFailed, setConnectionFailed] = useState(false);
  const [connectionFailedMessage, setConnectionFailedMessage] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (email, password, rememberMe) => {
    setLoading(true)

    const access = {
      email,
      password
    }

    try {
      const response = await axios.post('http://localhost:8080/login', access);
      console.log(response.data)

      if (response.status === 200) {
        setLoading(false);
        setConnectionFailed(false);
        setConnectionFailedMessage('');
        
        login(rememberMe)
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
    <SignInContainer direction="column" justifyContent="space-between">
      <FormControlLabel
        sx={{
          display: 'flex',
          justifyContent: 'end',
          width: 'max-content',
          color: (theme) => theme.palette.text.primary,
          padding: 1,
          marginLeft: 'auto',
        }}
        label="Mode sombre"
        control={<Switch
          checked={darkModeChecked}
          onChange={(event) => setCheckedDarkMode(event.target.checked)} />}
      />
      <Card variant="outlined">
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

          <ForgotPassword open={open} handleClose={handleClose} />
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
      </Card>
    </SignInContainer>
  );
}