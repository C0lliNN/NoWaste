import { Trans } from 'react-i18next';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import NoDataCard from '../NoDataCard';
import Card from '../UI/Card';
import { Container, Item, List, Title } from './styles';

interface Props {
  accounts: Array<{ accountName: string; balance: number }>;
}

export default function AccountBalances(props: Props): JSX.Element {
  const formatCurrency = useFormatCurrency();
  if (props.accounts.length === 0) {
    return <NoDataCard />;
  }

  return (
    <Card>
      <Container>
        <Title>
          <Trans i18nKey="accounts">Accounts</Trans>
        </Title>
        <List>
          {props.accounts.map((a) => (
            <Item key={a.accountName}>
              <h4>
                <span>{a.accountName}</span>:{' '}
              </h4>
              <h4 className={a.balance >= 0 ? 'success' : 'danger'}>
                <span>{formatCurrency(a.balance)}</span>
              </h4>
            </Item>
          ))}
        </List>
      </Container>
    </Card>
  );
}
