import { Container, Text } from './styles';
import Card from '../UI/Card';
import { Trans } from 'react-i18next';

export default function NoDataCard(): JSX.Element {
  return (
    <Card>
      <Container>
        <Text>
          <Trans i18nKey="noData"> No Data</Trans>
        </Text>
      </Container>
    </Card>
  );
}
