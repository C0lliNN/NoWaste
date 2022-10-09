import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as AccountsIcon } from '../../assets/icons/accounts.svg';
import { ReactComponent as CategoriesIcon } from '../../assets/icons/categories.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as Logo } from '../../assets/icons/icon.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import profilePictureLightIcon from '../../assets/icons/profile_picture.svg';
import { ReactComponent as TransactionsIcon } from '../../assets/icons/transactions.svg';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { logout } from '../../store/auth';
import {
  Container,
  Link,
  LinkContainer,
  LogoContainer,
  LogoutDesktopContainer,
  NewTransactionButton
} from './styles';

export default function Navigation(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const photoUrl = useAppSelector((state) => state.auth.user?.photoUrl);
  const { t } = useTranslation();

  function handleLogout(): void {
    dispatch(logout());
  }

  function handleCreateTransaction(): void {
    navigate('/transactions', { state: { showCreateModal: true } });
  }

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
            <Trans i18nKey="home">Home</Trans>
          </span>
        </Link>
        <Link to="/transactions">
          <TransactionsIcon />
          <Trans i18nKey="transactions">Transactions</Trans>
        </Link>
        <NewTransactionButton onClick={handleCreateTransaction}>
          <Plus />
          <span>
            <Trans i18nKey="transaction">Transaction</Trans>
          </span>
        </NewTransactionButton>
        <Link to="/categories">
          <CategoriesIcon />
          <span>
            <Trans i18nKey="categories">Categories</Trans>
          </span>
        </Link>
        <Link to="/accounts">
          <AccountsIcon />
          <span>
            <Trans i18nKey="accounts">Accounts</Trans>
          </span>
        </Link>
      </LinkContainer>
      <LogoutDesktopContainer onClick={handleLogout}>
        <img
          src={photoUrl?.trim() ? photoUrl : profilePictureLightIcon}
          alt={t('Profile Picture')}
        />
        <LogoutIcon />
        <span>
          <Trans i18nKey="logout">Logout</Trans>
        </span>
      </LogoutDesktopContainer>
    </Container>
  );
}
