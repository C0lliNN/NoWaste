import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useAppSelector } from './hooks/hooks';
import Home from './pages/Home';
import Login from './pages/Login';

export default function App(): JSX.Element {
  const authenticated = useAppSelector((state) => state.auth.authenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute authenticated={authenticated}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<p>404 Not Found</p>} />
    </Routes>
  );
}
