import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { ReactComponent as GithubIcon } from '../../assets/icons/github.svg';
import { ReactComponent as GoogleIcon } from '../../assets/icons/google.svg';
import { ReactComponent as Logo } from '../../assets/icons/icon.svg';
import Spinner from '../../components/UI/Spinner';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { login } from '../../store/auth';
import { fireError } from '../../utils/customAlert';
import {
  Container,
  Footer,
  GithubButton,
  GoogleButton,
  LogoContainer,
  Paragraph,
  SocialMediaContainer
} from './styles';

export default function Login(): JSX.Element {
  const { authenticated, loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  async function handleGoogleLogin(): Promise<void> {
    void dispatch(login('GOOGLE'));
  }

  async function handleGithubLogin(): Promise<void> {
    void dispatch(login('GITHUB'));
  }

  useEffect(() => {
    if (error) {
      fireError(t('It was not possible to login successfully'));
      console.error(error);
    }
  }, [error]);

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <LogoContainer>
        <Logo />
        <h1>No Waste</h1>
      </LogoContainer>
      {loading ? (
        <div style={{ margin: '0 auto' }}>
          <Spinner />
        </div>
      ) : (
        <>
          <Paragraph>
            <Trans i18nKey="loginCreateAccount">
              Access or Create your account to start managing your money
            </Trans>
          </Paragraph>
          <SocialMediaContainer>
            <GoogleButton onClick={handleGoogleLogin}>
              <GoogleIcon />
              <Trans i18nKey="loginGoogle">Continue with Google</Trans>
            </GoogleButton>
            <GithubButton onClick={handleGithubLogin}>
              <GithubIcon />
              <Trans i18nKey="loginGithub">Continue with GitHub</Trans>
            </GithubButton>
          </SocialMediaContainer>
        </>
      )}
      <Footer>
        <Trans i18nKey="loginCopyright">© NoWaste - All Rights Reserved</Trans>
      </Footer>
    </Container>
  );
}
