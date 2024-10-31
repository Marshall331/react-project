import { useEffect } from 'react';
import SignUp from '../../components/forms/SignUp/SignUp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

function Register() {

    useEffect(() => {
        document.title = 'Créer un compte';
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
            <SignUp darkModeChecked={darkMode} setCheckedDarkMode={setDarkMode}></SignUp>
        </ThemeProvider>
    );
}

export default Register;
