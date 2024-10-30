import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState, useMemo } from 'react';
import Header from './components/layout/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Loading from './_utils/Loading';
import AuthRouter from './pages/Auth/AuthRouter';
import AuthGard from './_helpers/AuthGard';
import SignIn from './components/forms/SignIn/SignIn';

const Home = lazy(() => import('./pages/Home'));
const Solo = lazy(() => import('./pages/Solo'));
const Multiplayer = lazy(() => import('./pages/Multiplayer'));

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

function Content() {
  const [darkMode, setDarkMode] = useState(true);

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
        {/* <Header darkModeChecked={darkMode} setCheckedDarkMode={setDarkMode} />
        <div className="container mt-4"> */}
          <Routes>
            <Route path="/" element={<AuthGard><Home /></AuthGard>} />
            <Route path="/solo" element={<AuthGard><Solo /></AuthGard>} />
            <Route path="/multiplayer" element={<AuthGard><Multiplayer /></AuthGard>} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        {/* </div> */}
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
