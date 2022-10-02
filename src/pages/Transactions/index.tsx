import { AxiosError } from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import Button from '../../components/UI/Button';
import ErrorMessage from '../../components/UI/ErrorMessage';
import FormGroup from '../../components/UI/FormGroup';
import Spinner from '../../components/UI/Spinner';
import Table from '../../components/UI/Table';
import { Transaction } from '../../models/transaction';
import {
  createTransaction,
  CreateTransactionRequest,
  getTransactions,
  updateTransaction,
  UpdateTransactionRequest
} from '../../services/api';
import { fireError } from '../../utils/customAlert';
import CreateTransactionModal from './CreateTransactionModal';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { Container, EditButton, FilterContainer, Header, LoadingContainer, Title } from './styles';
import { useTheme } from 'styled-components';
import useMediaQuery from '../../hooks/media-query';
import EditTransactionModal from './EditTransactionModal';

export default function Transactions(): JSX.Element {
  const now = useMemo(() => dayjs(), []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [startDate, setStartDate] = useState<Dayjs>(now.subtract(30, 'days'));
  const [endDate, setEndDate] = useState<Dayjs>(now);
  const theme: any = useTheme();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [transaction, setTransaction] = useState<Transaction | null>(null);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const mediaQuery = useMediaQuery(`(min-width: ${theme.lgBreakpoint})`);

  function handleShowCreateModal(): void {
    setShowCreateModal(true);
  }

  function handleCloseCreateModal(): void {
    setShowCreateModal(false);
  }

  function handleShowEditModal(transaction: Transaction): void {
    setShowEditModal(true);
    setTransaction(transaction);
  }

  function handleCloseEditModal(): void {
    setShowEditModal(false);
    setTransaction(null);
  }

  async function handleCreateTransaction(req: CreateTransactionRequest): Promise<void> {
    setLoading(true);
    try {
      await createTransaction(req);
      await fetchTransactions();
    } catch (err) {
      if (err instanceof AxiosError) {
        fireError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateTransaction(req: UpdateTransactionRequest): Promise<void> {
    setLoading(true);
    try {
      await updateTransaction(req);
      await fetchTransactions();
    } catch (err) {
      if (err instanceof AxiosError) {
        fireError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetchTransactions(): Promise<void> {
    setLoading(true);
    try {
      const response = await getTransactions({
        startDate: startDate.toDate(),
        endDate: endDate.toDate()
      });
      setTransactions(response);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err);
      } else {
        setError(new Error());
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchTransactions();
  }, [startDate, endDate]);

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message}></ErrorMessage>;
  }

  return (
    <Container>
      <Header>
        <Title>
          <Trans i18nKey="transactions">Transactions</Trans>
        </Title>
        <Button variant="success" onClick={handleShowCreateModal}>
          <Trans i18nKey="newTransaction">New Transaction</Trans>
        </Button>
      </Header>

      <FilterContainer>
        <FormGroup>
          <FormGroup.Label htmlFor="startDate">
            <Trans i18nKey="startDate">Start Date</Trans>
          </FormGroup.Label>
          <FormGroup.Input
            type="date"
            id="startDate"
            value={startDate.format('YYYY-MM-DD')}
            onChange={(e) => setStartDate(dayjs(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="endDate">
            <Trans i18nKey="endDate">End Date</Trans>
          </FormGroup.Label>
          <FormGroup.Input
            type="date"
            id="startDate"
            value={endDate.format('YYYY-MM-DD')}
            onChange={(e) => setEndDate(dayjs(e.target.value))}
          />
        </FormGroup>
      </FilterContainer>

      {!transactions.length && (
        <p>
          <Trans i18nKey="noCategories">No transactions registered</Trans>
        </p>
      )}

      {transactions.length > 0 && (
        <Table>
          <Table.Header>
            <tr>
              <th>
                <Trans i18nKey="date">Date</Trans>
              </th>
              <th>
                <Trans i18nKey="category">Category</Trans>
              </th>
              <th>
                <Trans i18nKey="amount">Amount</Trans>
              </th>
              {mediaQuery && (
                <>
                  <th>
                    <Trans i18nKey="type">Type</Trans>
                  </th>
                  <th>
                    <Trans i18nKey="account">Account</Trans>
                  </th>
                  <th>
                    <Trans i18nKey="recurrence">Recurrence</Trans>
                  </th>
                </>
              )}
              <th>
                <Trans i18nKey="actions">Actions</Trans>
              </th>
            </tr>
          </Table.Header>
          <Table.Body>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{dayjs(t.date).format('DD/DD/YY')}</td>
                <td>{t.category.name}</td>
                <td style={{ color: t.type === 'EXPENSE' ? theme.danger : theme.success }}>
                  <Trans i18nKey="currency">$</Trans>
                  {t.amount.toFixed(2)}
                </td>
                {mediaQuery && (
                  <>
                    <td>
                      <Trans i18nKey={t.type}>{t.type}</Trans>
                    </td>
                    <td>
                      <Trans i18nKey={t.recurrence}>{t.recurrence}</Trans>
                    </td>
                    <td>{t.account.name}</td>
                  </>
                )}
                <td>
                  <EditButton onClick={() => handleShowEditModal(t)}>
                    <EditIcon fill={theme.secondary} />
                  </EditButton>
                </td>
              </tr>
            ))}
          </Table.Body>
        </Table>
      )}

      <CreateTransactionModal
        show={showCreateModal}
        onCreate={handleCreateTransaction}
        loading={loading}
        onClose={handleCloseCreateModal}></CreateTransactionModal>

      <EditTransactionModal
        show={showEditModal}
        transaction={transaction}
        onUpdate={handleUpdateTransaction}
        loading={loading}
        onClose={handleCloseEditModal}></EditTransactionModal>
    </Container>
  );
}
