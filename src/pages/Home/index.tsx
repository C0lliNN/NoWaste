import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import AccountBalances from '../../components/AccountBalances';
import ExpensesByCategoryChart from '../../components/ExpensesByCategoryChart';
import MobileUserDropdown from '../../components/MobileUserDropdown';
import MonthBalanceChart from '../../components/MonthBalanceChart';
import MonthBalanceStats from '../../components/MonthBalanceStats';
import ErrorMessage from '../../components/UI/ErrorMessage';
import Spinner from '../../components/UI/Spinner';
import { Status } from '../../models/status';
import { getStatus, Month } from '../../services/api';
import {
  Container,
  Header,
  MonthContainer,
  MonthSelect,
  SpinnerContainer,
  StatsContainer,
  Title
} from './styles';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchCategories } from '../../store/categories';
import { fetchAccounts } from '../../store/accounts';

const months = [
  { text: 'Jan', value: 'JANUARY' },
  { text: 'Feb', value: 'FEBRUARY' },
  { text: 'Mar', value: 'MARCH' },
  { text: 'Apr', value: 'APRIL' },
  { text: 'May', value: 'MAY' },
  { text: 'Jun', value: 'JUNE' },
  { text: 'Jul', value: 'JULY' },
  { text: 'Aug', value: 'AUGUST' },
  { text: 'Sep', value: 'SEPTEMBER' },
  { text: 'Oct', value: 'OCTOBER' },
  { text: 'Nov', value: 'NOVEMBER' },
  { text: 'Dec', value: 'DECEMBER' }
];

const initialStatus: Status = {
  monthIncome: 0,
  monthExpense: 0,
  monthBalance: 0,
  totalBalance: 0,
  expensesByCategory: [],
  balancesByAccount: []
};

export default function Home(): JSX.Element {
  const currentDate = dayjs();
  const [month, setMonth] = useState<Month>(months[currentDate.month()].value as Month);
  const [status, setStatus] = useState<Status>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  async function fetchStatus(): Promise<void> {
    setLoading(true);
    try {
      const response = await getStatus(month);
      setStatus(response);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
      } else {
        setError(t('Unexpected Error'));
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchStatus();
  }, [month]);

  useEffect(() => {
    void dispatch(fetchCategories());
    void dispatch(fetchAccounts());
  });

  return (
    <Container>
      <Header>
        <Title>
          <Trans i18nKey="home">Home</Trans>
        </Title>
      </Header>
      <MonthContainer>
        <MonthSelect value={month} onChange={(e) => setMonth(e.target.value as Month)}>
          {months.map((month) => (
            <option value={month.value} key={month.value}>
              <Trans i18nKey={month.text}>{month.text}</Trans>
            </option>
          ))}
        </MonthSelect>
      </MonthContainer>
      {error && <ErrorMessage message={error} />}
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <StatsContainer>
          <MonthBalanceStats
            totalBalance={status.totalBalance}
            monthExpense={status.monthExpense}
            monthIncome={status.monthIncome}
          />
          <ExpensesByCategoryChart expensesByCategory={status.expensesByCategory} />
          <MonthBalanceChart
            income={status.monthIncome}
            expense={status.monthExpense}
            balance={status.monthBalance}
          />
          <AccountBalances accounts={status.balancesByAccount} />
        </StatsContainer>
      )}
      <MobileUserDropdown />
    </Container>
  );
}
