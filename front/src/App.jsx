import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Loading from './_utils/Loading';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import Header from './components/layout/Header';

const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const Home = lazy(() => import('./pages/Home'));
const Solo = lazy(() => import('./pages/Solo'));
const Multiplayer = lazy(() => import('./pages/Multiplayer'));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Content />
      </AuthProvider>
    </BrowserRouter>
  );
}

function Content() {
  const [darkMode, setDarkMode] = useState(true);
  const { isAuthenticated } = useAuth();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        {isAuthenticated && (
          <Header darkModeChecked={darkMode} setCheckedDarkMode={setDarkMode} />
        )}
        {isAuthenticated ? (
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/solo" element={<Solo />} />
              <Route path="/multiplayer" element={<Multiplayer />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </Suspense>
    </ThemeProvider>
  );
}