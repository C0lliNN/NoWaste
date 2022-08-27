import { useAppDispatch } from '../../hooks/hooks';
import { logout } from '../../store/auth';

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();

  function handleLogout(): void {
    dispatch(logout());
  }

  return (
    <main>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}
