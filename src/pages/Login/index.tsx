import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  Container,
  Footer,
  GithubButton,
  GoogleButton,
  LogoContainer,
  Paragraph,
  SocialMediaContainer
} from './styles';
import { ReactComponent as Logo } from '../../assets/icons/icon.svg';
import { ReactComponent as GoogleIcon } from '../../assets/icons/google.svg';
import { ReactComponent as GithubIcon } from '../../assets/icons/github.svg';
import { Trans } from 'react-i18next';
import { handleFirebaseGithubLogin, handleFirebaseGoogleLogin } from '../../services/firebase';
import { loginSuccess, loginFailed, loginStart } from '../../store/auth';
import Spinner from '../../components/UI/Spinner';
import { fireError } from '../../utils/customAlert';

export default function Login(): JSX.Element {
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  if (authenticated) {
    return <Navigate to="/" />;
  }

  async function handleGoogleLogin(): Promise<void> {
    dispatch(loginStart());

    try {
      const user = await handleFirebaseGoogleLogin();
      dispatch(loginSuccess({ user }));
    } catch (err) {
      handleLoginError(err);
    }
  }

  async function handleGithubLogin(): Promise<void> {
    dispatch(loginStart());

    try {
      const user = await handleFirebaseGithubLogin();
      dispatch(loginSuccess({ user }));
    } catch (err) {
      handleLoginError(err);
    }
  }

  function handleLoginError(err: unknown): void {
    dispatch(loginFailed());
    fireError('It was not possible to login successfully');
    console.error(err);
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
