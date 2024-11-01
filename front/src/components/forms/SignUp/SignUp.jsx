import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import LinearProgress from '@mui/material/LinearProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import Alert from '@mui/material/Alert';

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

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUp({ darkModeChecked, setCheckedDarkMode }) {

  const [loading, setLoading] = useState(false);

  const [creationFailed, setCreationFailed] = useState(false);
  const [creationFailedMessage, setCreationFailedMessage] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');

  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');

  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const maxLength = 15;

  const validateInputs = () => {
    const username = document.getElementById('pseudo').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    let isValid = true;

    if (!username || username.length < 1) {
      setUsernameError(true);
      setUsernameErrorMessage('Merci de saisir votre pseudo.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!firstName || firstName.length < 1) {
      setFirstNameError(true);
      setFirstNameErrorMessage('Merci de saisir un nom.');
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage('');
    }

    if (!lastName || lastName.length < 1) {
      setLastNameError(true);
      setLastNameErrorMessage('Merci de saisir un prénom.');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
    }

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
      handleSubmit(username, firstName, lastName, email, password)
    }
  }

  const handleSubmit = async (username, firstName, lastName, email, password) => {
    setLoading(true)

    const account = {
      username,
      firstName,
      lastName,
      email,
      password,
    }

    try {
      const response = await axios.post('http://localhost:8080/register', account);

      if (response.status === 200) {
        console.log(response.data)
        setLoading(false);
        setCreationFailed(false);
        setCreationFailedMessage('');
      }

    } catch (error) {
      setLoading(false);
      setCreationFailed(true);
      if (error.response) {
        console.log(error.response.data)

        if (error.response.data) {
          setCreationFailedMessage("Création du compte impossible.");
          if (error.response.data.includes("pseudo")) {
            setUsernameError(true);
            setUsernameErrorMessage('Ce pseudo existe déjà.');
            setCreationFailedMessage(error.response.data);
          }

          if (error.response.data.includes("email")) {
            setEmailError(true);
            setEmailErrorMessage('Cet email existe déjà.');
            setCreationFailedMessage(error.response.data);
          }
        }
      } else {
        setCreationFailedMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
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
          Créer un compte
        </Typography>
        {creationFailed ? <Alert severity="warning">{creationFailedMessage}</Alert> : ""}
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <TextField
              autoComplete="pseudo"
              name="pseudo"
              fullWidth
              id="pseudo"
              label="Pseudo"
              variant="outlined"
              error={usernameError}
              helperText={usernameErrorMessage}
              color={usernameError ? 'error' : 'primary'}
            />
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <FormControl>
              <TextField
                autoComplete="firstName"
                name="name"
                fullWidth
                id="firstName"
                label="Nom"
                variant="outlined"
                error={firstNameError}
                helperText={firstNameErrorMessage}
                color={firstNameError ? 'error' : 'primary'}
              />
            </FormControl>

            <FormControl>
              <TextField
                autoComplete="lastName"
                name="lastName"
                fullWidth
                id="lastName"
                label="Prénom"
                variant="outlined"
                error={lastNameError}
                helperText={lastNameErrorMessage}
                color={lastNameError ? 'error' : 'primary'}
              />
            </FormControl>
          </Box>

          <FormControl>
            <TextField
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              label="E-mail"
              variant="outlined"
              error={emailError}
              helperText={emailErrorMessage}
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>

          <FormControl variant="outlined" sx={{ '--hue': Math.min(password.length * 10, 120) }}>
            <TextField
              fullWidth
              name="password"
              type='password'
              id="password"
              autoComplete="new-password"
              label="Mot de passe"
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? 'error' : 'primary'}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />

            <LinearProgress
              variant="determinate"
              value={Math.min((password.length * 100) / maxLength, 100)}
              sx={{
                marginTop: '0.25em',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'hsl(var(--hue) 80% 30%) !important'
                },
              }}
            />

            <Typography
              level="body-xs"
              color="hsl(var(--hue) 80% 30%) !important"
              sx={{ alignSelf: 'flex-end' }}
            >
              {getPasswordStrengthLabel(password.length)}
            </Typography>

          </FormControl>

          <LoadingButton
            type='submit'
            color="primary"
            onClick={validateInputs}
            loading={loading}
            variant="contained"
            size='large'
          >
            Créer mon compte
          </LoadingButton>

          <Typography sx={{ textAlign: 'center' }}>
            Vous avez déjà un compte ?{' '}
            <span>
              <Link
                href="/login"
                sx={{ alignSelf: 'center' }}
              >
                Se connecter
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>
  );
}

const getPasswordStrengthLabel = (value) => {
  if (value < 4) return 'Très faible';
  if (value >= 4 && value < 7) return 'Faible';
  if (value >= 7 && value < 12) return 'Fort';
  if (value >= 12) return 'Très fort';
  return '';
};