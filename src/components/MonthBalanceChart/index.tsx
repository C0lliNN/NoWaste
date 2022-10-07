import { Trans } from 'react-i18next';
import { Bar, BarChart, Tooltip } from 'recharts';
import { useTheme } from 'styled-components';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import NoDataCard from '../NoDataCard';
import Card from '../UI/Card';
import { Container, Data, DataContainer } from './styles';

interface Props {
  income: number;
  expense: number;
  balance: number;
}

export default function MonthBalanceChart(props: Props): JSX.Element {
  const theme: any = useTheme();
  const formatCurrency = useFormatCurrency();

  if (props.expense === 0 && props.income === 0) {
    return <NoDataCard />;
  }

  return (
    <Card>
      <Container>
        <BarChart
          data={[{ name: 'Balance', income: props.income, expense: props.expense }]}
          width={100}
          height={200}>
          <Tooltip />
          <Bar dataKey="income" fill={theme.success} />
          <Bar dataKey="expense" fill={theme.danger} />
        </BarChart>
        <DataContainer>
          <Data>
            <h4>
              <Trans i18nKey="income">Income</Trans>
            </h4>
            <h4>{formatCurrency(props.income)}</h4>
          </Data>
          <Data>
            <h4>
              <Trans i118nKey="expense">Expense</Trans>
            </h4>
            <h4>{formatCurrency(props.expense)}</h4>
          </Data>
          <Data>
            <h4>
              <Trans i118nKey="balance">Balance</Trans>
            </h4>
            <h4 className={props.balance >= 0 ? `success` : 'danger'}>
              {formatCurrency(props.balance)}
            </h4>
          </Data>
        </DataContainer>
      </Container>
    </Card>
  );
}
