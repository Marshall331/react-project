import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import ThemeSwitch from '../../Theme/ThemeSwitch';
import { createAccount as createAccountAPI } from '@/services/AuthService.jsx'
import { FormCard, FormContainer } from '../FormContainer';
import ConfirmationDialog from '../ConfirmationDialog';

export default function SignUpForm() {

  const [open, setOpen] = useState(false);

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
    setCreationFailed(false);
    setCreationFailedMessage('');

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

  const handleSubmit = async (username, firstname, lastname, email, password) => {
    setLoading(true)

    const account = {
      username,
      firstname,
      lastname,
      email,
      password,
    }

    try {
      const response = await createAccountAPI(account);

      if (response.status === 200) {
        setLoading(false);
        setCreationFailed(false);
        setCreationFailedMessage('');

        setOpen(true);
      }

    } catch (error) {
      setLoading(false);
      setCreationFailed(true);
      if (error.response) {
        console.log(error)

        if (error.response.data) {
          setCreationFailedMessage(error.response.data);

          if (error.response.data.includes("pseudo")) {
            setUsernameError(true);
            setUsernameErrorMessage('Ce pseudo existe déjà.');
          }
          if (error.response.data.includes("email")) {
            setEmailError(true);
            setEmailErrorMessage('Cet email existe déjà.\n');
          }

        } else {
          setCreationFailedMessage("La connexion a échoué.");
        }

      } else {
        setCreationFailedMessage("Connexion au serveur impossible.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormContainer direction="column" justifyContent="space-between">

      <ThemeSwitch />

      <FormCard variant="outlined">
        <Typography

          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
        >
          Créer un compte
        </Typography>
        {creationFailed ? <Alert severity="warning">{creationFailedMessage}</Alert> : ""}
        <Box
          sx={{
            display: 'flex', flexDirection: 'column', gap: 2, marginTop: '1em',
          }}
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

          <ConfirmationDialog
            open={open}
            text='Votre compte a bien été créé, vous pouvez à présent vous connecter !'
            redirectPath={'/login'}
          />

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
      </FormCard>
    </FormContainer>
  );
}

const getPasswordStrengthLabel = (value) => {
  if (value < 4) return 'Très faible';
  if (value >= 4 && value < 7) return 'Faible';
  if (value >= 7 && value < 12) return 'Fort';
  if (value >= 12) return 'Très fort';
  return '';
};