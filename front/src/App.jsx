import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import Loading from './utils/Loading';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Header from './layout/Header';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';

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
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<Loading />}>
      {isAuthenticated ? (
        <>
          <Header />
          <PrivateRoutes />
        </>
      ) : (
        <PublicRoutes />
      )}
    </Suspense>
  );
}