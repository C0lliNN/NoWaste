import { useEffect } from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import Home from './pages/Home';
import Login from './pages/Login';
import { initAuth } from './store/auth';

export default function App(): JSX.Element {
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <ProtectedRoute authenticated={authenticated}>
            <>
              <Navigation />
              <Home />
              <Routes>
                <Route path="*" element={<p>404 Not Found</p>} />
              </Routes>
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
