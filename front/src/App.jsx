import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Solo from './pages/Solo';
import Multiplayer from './pages/Multiplayer';
import Header from './components/layout/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import SignIn from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

function Content() {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === '/sign-in';

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      ) : (
        <ThemeProvider theme={theme}>
          <Header darkModeChecked={darkMode} setCheckedDarkMode={setDarkMode} />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/solo" element={<Solo />} />
              <Route path="/multiplayer" element={<Multiplayer />} />
              <Route path="/logout" element={<SignIn />} />
            </Routes>
          </div>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
