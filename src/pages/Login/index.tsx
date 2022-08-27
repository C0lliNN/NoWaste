import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login } from '../../store/auth';
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

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const authenticated = useAppSelector((state) => state.auth.authenticated);

  if (authenticated) {
    navigate('/');
  }

  const dispatch = useAppDispatch();

  function handleLogin(): void {
    dispatch(login({ token: '' }));
  }

  return (
    <Container>
      <LogoContainer>
        <Logo />
        <h1>No Waste</h1>
      </LogoContainer>
      <Paragraph>
        <Trans i18nKey="loginCreateAccount">
          Access or Create your account to start managing your money
        </Trans>
      </Paragraph>
      <SocialMediaContainer>
        <GoogleButton onClick={handleLogin}>
          <GoogleIcon />
          <Trans i18nKey="loginGoogle">Continue with Google</Trans>
        </GoogleButton>
        <GithubButton onClick={handleLogin}>
          <GithubIcon />
          <Trans i18nKey="loginGithub">Continue with GitHub</Trans>
        </GithubButton>
      </SocialMediaContainer>
      <Footer>
        <Trans i18nKey="loginCopyright">© NoWaste - All Rights Reserved</Trans>
      </Footer>
    </Container>
  );
}
