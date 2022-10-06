import { Trans } from 'react-i18next';
import { Container, Text } from './styles';

export default function NotFound(): JSX.Element {
  return (
    <Container>
      <Text>
        <Trans i18nKey="notFound">The page you trying to access was not found</Trans>
      </Text>
    </Container>
  );
}
