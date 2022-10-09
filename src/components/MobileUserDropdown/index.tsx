import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg';
import profilePictureDarkIcon from '../../assets/icons/profile_picture_dark.svg';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import useComponentVisible from '../../hooks/useComponentVisible';
import { logout } from '../../store/auth';
import { Container, Dropdown, DropdownContent, LogoutButton, Trigger } from './styles';

export default function MobileUserDropdown(): JSX.Element {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const dispatch = useAppDispatch();
  const photoUrl = useAppSelector((state) => state.auth.user?.photoUrl);
  const { t } = useTranslation();

  function handleLogout(): void {
    dispatch(logout());
  }

  return (
    <Container ref={ref}>
      <Trigger onClick={() => setIsComponentVisible(true)}>
        <img
          src={photoUrl?.trim() ? photoUrl : profilePictureDarkIcon}
          alt={t('Profile Picture')}
        />
      </Trigger>
      <Dropdown>
        {isComponentVisible && (
          <DropdownContent>
            <LogoutButton onClick={handleLogout}>
              <LogoutIcon width={16} height={16} />
              <span>
                <Trans i18nKey="logout">Logout</Trans>
              </span>
            </LogoutButton>
          </DropdownContent>
        )}
      </Dropdown>
    </Container>
  );
}
