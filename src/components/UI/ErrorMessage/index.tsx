import { Trans } from 'react-i18next';
import { Container, Message, Title } from './styles';

interface Props {
  message: string;
}

export default function ErrorMessage(props: Props): JSX.Element {
  return (
    <Container>
      <Title>
        <Trans i18nKey="unexpectedError">An unexpected error happened!</Trans>
      </Title>
      <Message>{props.message}</Message>
    </Container>
  );
}
