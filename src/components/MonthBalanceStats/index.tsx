import { Trans } from 'react-i18next';
import Card from '../UI/Card';
import { ReactComponent as ArrowUp } from '../../assets/icons/arrow_up.svg';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrow_down.svg';
import { MonthContainer, MonthExpense, MonthIncome, TotalBalance, Text, Container } from './styles';
import { useTheme } from 'styled-components';
import useFormatCurrency from '../../hooks/useFormatCurrency';

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
  const formatCurrency = useFormatCurrency();

  return (
    <Card>
      <Container>
        <TotalBalance>{formatCurrency(totalBalance)}</TotalBalance>
        <MonthContainer>
          <MonthIncome>
            <ArrowUp fill={theme.success} />
            <div>
              <Text>
                <Trans i18nKey="income">Income</Trans>
              </Text>
              <h4>{formatCurrency(monthIncome)}</h4>
            </div>
          </MonthIncome>
          <MonthExpense>
            <ArrowDown fill={theme.danger} />
            <div>
              <Text>
                <Trans i18nKey="expense">Expense</Trans>
              </Text>
              <h4>{formatCurrency(monthExpense)}</h4>
            </div>
          </MonthExpense>
        </MonthContainer>
      </Container>
    </Card>
  );
}
