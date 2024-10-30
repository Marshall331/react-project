import { useEffect } from 'react';
import SignIn from '../../components/forms/SignIn/SignIn';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

function Login() {

    useEffect(() => {
        document.title = 'Connexion';
        return () => {
            document.title = '';
        };
    }, []);

    const [darkMode, setDarkMode] = useState(true);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <SignIn darkModeChecked={darkMode} setCheckedDarkMode={setDarkMode}></SignIn>
        </ThemeProvider>
    );
}

export default Login;
