import { Container, Link, MobileContainer, NewTransactionMobileButton } from './styles';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as TransactionsIcon } from '../../assets/icons/transactions.svg';
import { ReactComponent as CategoriesIcon } from '../../assets/icons/categories.svg';
import { ReactComponent as AccountsIcon } from '../../assets/icons/accounts.svg';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import useMediaQuery from '../../hooks/media-query';

interface Theme {
  lgBreakpoint: string;
}

export default function Navigation(): JSX.Element {
  const theme = useTheme() as Theme;
  const mediaQuery = useMediaQuery(`(min-width: ${theme.lgBreakpoint})`);
  const navigate = useNavigate();

  return (
    <Container>
      {mediaQuery ? (
        <p>desktop bark</p>
      ) : (
        <MobileContainer>
          <Link to="/home">
            <HomeIcon />
            <label>
              <Trans key="home">Home</Trans>
            </label>
          </Link>
          <Link to="/transactions">
            <TransactionsIcon />
            <Trans key="transactions">Transactions</Trans>
          </Link>
          <NewTransactionMobileButton>
            <Plus onClick={() => navigate('/transactions/create')} />
          </NewTransactionMobileButton>
          <Link to="/categories">
            <CategoriesIcon />
            <Trans key="categories">Categories</Trans>
          </Link>
          <Link to="/accounts">
            <AccountsIcon />
            <Trans key="accounts">Accounts</Trans>
          </Link>
        </MobileContainer>
      )}
    </Container>
  );
}
