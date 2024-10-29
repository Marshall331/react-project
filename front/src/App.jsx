import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Solo from './pages/Solo';
import Multiplayer from './pages/Multiplayer';
import Header from './components/layout/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Création du thème
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header darkModeChecked={darkMode} setCheckedDarkMode={() => setDarkMode((prev) => !prev)} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solo" element={<Solo />} />
            <Route path="/multiplayer" element={<Multiplayer />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
