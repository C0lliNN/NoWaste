import {
  Container,
  LogoContainer,
  Link,
  LinkContainer,
  NewTransactionButton,
  LogoutContainer
} from './styles';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as TransactionsIcon } from '../../assets/icons/transactions.svg';
import { ReactComponent as CategoriesIcon } from '../../assets/icons/categories.svg';
import { ReactComponent as AccountsIcon } from '../../assets/icons/accounts.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg';
import { ReactComponent as Logo } from '../../assets/icons/icon.svg';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Navigation(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoContainer>
        <Logo width="64px" height="64px" />
        <h1>No Waste</h1>
      </LogoContainer>
      <LinkContainer>
        <Link to="/home">
          <HomeIcon />
          <span>
            <Trans key="home">Home</Trans>
          </span>
        </Link>
        <Link to="/transactions">
          <TransactionsIcon />
          <Trans key="transactions">Transactions</Trans>
        </Link>
        <NewTransactionButton>
          <Plus onClick={() => navigate('/transactions/create')} />
          <span>
            <Trans key="transactions">Transaction</Trans>
          </span>
        </NewTransactionButton>
        <Link to="/categories">
          <CategoriesIcon />
          <span>
            <Trans key="categories">Categories</Trans>
          </span>
        </Link>
        <Link to="/accounts">
          <AccountsIcon />
          <span>
            <Trans key="accounts">Accounts</Trans>
          </span>
        </Link>
      </LinkContainer>
      <LogoutContainer>
        <img src="https://picsum.photos/100" alt="Profile Picture" />
        <LogoutIcon />
        <span>
          <Trans key="logout">Logout</Trans>
        </span>
      </LogoutContainer>
    </Container>
  );
}
