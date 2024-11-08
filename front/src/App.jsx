import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import Loading from './utils/Loading';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Header from './layout/Header';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { Container } from '@mui/material';

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}>
      <ThemeProvider>
        <AuthProvider>
          <Content />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function Content() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  return (
    <Suspense fallback={<Loading />}>
      {isAuthenticated ? (
        <Container
          maxWidth="false"
          disableGutters
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary
          }}
        >
          <Header />
          <Container
            component="main"
            maxWidth="xl"
            sx={{ mt: 4 }}
          >
            <PrivateRoutes />
          </Container>
        </Container>
      ) : (
        <PublicRoutes />
      )}
    </Suspense>
  );
}
