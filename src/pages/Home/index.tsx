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
import useAppDispatch from '../../hooks/useAppDispatch';
import { Status } from '../../models/status';
import { Month, getStatus } from '../../services/api';
import { fetchAccounts } from '../../store/accounts';
import { fetchCategories } from '../../store/categories';
import {
  Container,
  DateFilterContainer,
  Header,
  Select,
  SpinnerContainer,
  StatsContainer,
  Title
} from './styles';

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

function range(start: number, stop: number, step: number): number[] {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
}

// The years available for searching will be in the range (currentYear - 5 until currentYear + 1)
const years = range(dayjs().year() - 5, dayjs().year() + 1, 1);

export default function Home(): JSX.Element {
  const currentDate = dayjs();
  const [month, setMonth] = useState<Month>(months[currentDate.month()].value as Month);
  const [year, setYear] = useState<number>(currentDate.year());
  const [status, setStatus] = useState<Status>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  async function fetchStatus(): Promise<void> {
    setLoading(true);
    try {
      const response = await getStatus(year, month);
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
  }, [month, year]);

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
      <DateFilterContainer>
        <Select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </Select>
        <Select value={month} onChange={(e) => setMonth(e.target.value as Month)}>
          {months.map((month) => (
            <option value={month.value} key={month.value}>
              <Trans i18nKey={month.text}>{month.text}</Trans>
            </option>
          ))}
        </Select>
      </DateFilterContainer>
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
