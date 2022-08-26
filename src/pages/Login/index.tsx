import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login } from '../../store/auth';

export default function Login(): JSX.Element {
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const dispatch = useAppDispatch();

  if (authenticated) {
    return <Navigate to="/" />;
  }

  function handleLogin(): void {
    dispatch(login({ token: '' }));
  }

  return (
    <div>
      <p>Login Page</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
