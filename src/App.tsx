import { Routes } from 'react-router';
import { Navigate, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { useAppSelector } from './hooks/hooks';
import Accounts from './pages/Accounts';
import Categories from './pages/Categories';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Transactions from './pages/Transactions';

const Main = styled.main`
  background-color: #f4f4f4;
  min-height: 100vh;
  margin-bottom: 72px;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    margin-left: 340px;
    margin-bottom: 0px;
  }
`;

export default function App(): JSX.Element {
  const authenticated = useAppSelector((state) => state.auth.authenticated);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <ProtectedRoute authenticated={authenticated}>
            <>
              <Navigation />
              <Main>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Main>
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
