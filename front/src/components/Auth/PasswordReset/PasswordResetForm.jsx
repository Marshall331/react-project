import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import { FormCard, FormContainer } from '../FormContainer';
import ThemeSwitch from '../../Theme/ThemeSwitch';
import { resetPassword as resetPasswordAPI } from '@/services/AuthService.jsx'
import ConfirmationDialog from './ConfirmationDialog';

export default function PasswordResetForm({ resetToken }) {

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(true);

    const [resetFailed, setResetFailed] = useState(false);
    const [resetFailedMessage, setResetFailedMessage] = useState('');

    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const [password, setPassword] = useState('');
    const maxLength = 15;

    const validateInputs = () => {
        setResetFailed(false);
        setResetFailedMessage('');

        const password = document.getElementById('password').value;

        let isValid = true;

        if (!password || password.length < 4) {
            setPasswordError(true);
            setPasswordErrorMessage('Le mot de passe doit contenir au minimum 4 caractères.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (isValid) {
            handleSubmit(password)
        }
    }

    const handleSubmit = async (newPassword) => {
        setLoading(true)

        const reset = {
            resetToken,
            newPassword,
        }

        try {
            console.log(reset)
            const response = await resetPasswordAPI(reset);

            if (response.status === 200) {
                setLoading(false);
                setResetFailed(false);
                setResetFailedMessage('');

                setOpen(true);
            }

        } catch (error) {
            setLoading(false)
            setResetFailed(true)

            if (error.response && error.response.data) {
                setResetFailedMessage(error.response.data);
            } else {
                setResetFailedMessage("Connexion au serveur impossible.");
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

                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 1.2rem)', textAlign: 'center' }}
                >
                    Nouveau mot de passe
                </Typography>
                {resetFailed ? <Alert severity="warning">{resetFailedMessage}</Alert> : ""}
                <Box
                    sx={{
                        display: 'flex', flexDirection: 'column', gap: 2, marginTop: '1em',
                    }}
                >

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

                    <ConfirmationDialog open={open} />

                    <LoadingButton
                        type='submit'
                        color="primary"
                        onClick={validateInputs}
                        loading={loading}
                        variant="contained"
                        size='large'
                    >
                        Réinitialiser
                    </LoadingButton>

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