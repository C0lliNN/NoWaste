import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { useAppSelector } from './hooks/hooks';
import Categories from './pages/Categories';
import Home from './pages/Home';
import Login from './pages/Login';

const Main = styled.main`
  background-color: #f4f4f4;
  min-height: 100vh;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    margin-left: 340px;
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
                  <Route path="/home" element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="*" element={<p>404 Not Found</p>} />
                </Routes>
              </Main>
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
