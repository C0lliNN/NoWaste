import { Trans } from 'react-i18next';
import Card from '../UI/Card';
import { ReactComponent as ArrowUp } from '../../assets/icons/arrow_up.svg';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrow_down.svg';
import { MonthContainer, MonthExpense, MonthIncome, TotalBalance, Text, Container } from './styles';
import { useTheme } from 'styled-components';

interface Props {
  monthExpense: number;
  monthIncome: number;
  totalBalance: number;
}

export default function MonthBalanceStats({
  monthExpense,
  monthIncome,
  totalBalance
}: Props): JSX.Element {
  const theme: any = useTheme();

  return (
    <Card>
      <Container>
        <TotalBalance>
          <Trans i18nKey="currency">$</Trans> {totalBalance.toFixed(2)}
        </TotalBalance>
        <MonthContainer>
          <MonthIncome>
            <ArrowUp fill={theme.success} />
            <div>
              <Text>
                <Trans i18nKey="income">Income</Trans>
              </Text>
              <h4>
                <Trans i18nKey="currency">$</Trans> {monthIncome.toFixed(2)}
              </h4>
            </div>
          </MonthIncome>
          <MonthExpense>
            <ArrowDown fill={theme.danger} />
            <div>
              <Text>
                <Trans i18nKey="expense">Expense</Trans>
              </Text>
              <h4>
                <Trans i18nKey="currency">$</Trans> {monthExpense.toFixed(2)}
              </h4>
            </div>
          </MonthExpense>
        </MonthContainer>
      </Container>
    </Card>
  );
}
