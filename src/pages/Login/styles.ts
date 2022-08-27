import styled from 'styled-components';

const Container = styled.main`
  padding: 40px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.primary};

  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    padding: 60px 0 40px 0;
  }
`;

const LogoContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 82px;
    height: 82px;
    @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
      width: 100px;
      height: 100px;
    }
  }
  h1 {
    color: #fff;
    font-size: 3em;
    margin-left: 12px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
    @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
      font-size: 4em;
    }
  }
`;

const Paragraph = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5em;
  font-weight: 500;
  color: #fff;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    width: 40%;
    font-size: 2em;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    width: 50%;
    margin: 0 auto;
  }
`;

const SocialButton = styled.button`
  padding: 20px 10px;
  width: 80%;
  margin: 0 auto;
  border-radius: 12px;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-size: 1.5em;
  font-family: 'Roboto';
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    padding: 25px 10px;
    font-size: 1.8em;
  }
`;

const GoogleButton = styled(SocialButton)`
  background: #fff;
  color: rgba(0, 0, 0, 0.54);
`;

const GithubButton = styled(SocialButton)`
  background: #000;
  color: #fff;
`;

const Footer = styled.footer`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.25em;
  font-weight: 500;
  text-align: center;
  color: #fff;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    font-size: 2em;
  }
`;

export {
  Container,
  LogoContainer,
  Paragraph,
  SocialMediaContainer,
  GoogleButton,
  GithubButton,
  Footer
};
