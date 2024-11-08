import { BrowserRouter } from 'react-router-dom';
import { Suspense, useMemo } from 'react';
import Loading from './utils/Loading';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Header from './layout/Header';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { Container } from '@mui/material';
import { lazy } from 'react';

const PrivateRoutes = lazy(() => import('./routes/PrivateRoutes'));
const PublicRoutes = lazy(() => import('./routes/PublicRoutes'));

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <AuthProvider>
          <Content />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function Content() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  const themeStyles = useMemo(() => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: theme.palette.background.default,
    color: theme.palette.text.primary,
  }), [theme]);

  return (
    <Suspense fallback={<Loading />}>
      <Container
        maxWidth="false"
        disableGutters
        sx={themeStyles}
      >
        {isAuthenticated ? <Header /> : ""}
        <Container
          component="main"
          maxWidth="xl"
          sx={{ mt: 4 }}
        >
          {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
        </Container>
      </Container>
    </Suspense>
  );
}
