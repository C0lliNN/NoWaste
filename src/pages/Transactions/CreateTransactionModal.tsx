import { uuidv4 } from '@firebase/util';
import dayjs from 'dayjs';
import { SyntheticEvent, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../../components/UI/Button';
import FormGroup from '../../components/UI/FormGroup';
import Modal from '../../components/UI/Modal';
import Spinner from '../../components/UI/Spinner';
import { useAppSelector } from '../../hooks/hooks';
import { CreateTransactionRequest } from '../../services/api';

interface Props {
  show: boolean;
  loading: boolean;
  onCreate: (req: CreateTransactionRequest) => Promise<void>;
  onClose: () => void;
}

export default function CreateTransactionModal(props: Props): JSX.Element {
  const typeRef = useRef<HTMLSelectElement>(null);
  const recurrenceRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const accountRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const categories = useAppSelector((state) => state.categories.categories);
  const accounts = useAppSelector((state) => state.accounts.accounts);

  const { t } = useTranslation();

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();

    const type = typeRef.current?.value as string;
    const recurrence = recurrenceRef.current?.value as string;
    const categoryId = categoryRef.current?.value as string;
    const accountId = accountRef.current?.value as string;
    const amount = Number(amountRef.current?.value);
    const date = dayjs(dateRef.current?.value as string);
    // Setting it to 12 hours to handle timezone differences gracefully
    date.set('hour', 12);

    const description = descriptionRef.current?.value;

    props
      .onCreate({
        type,
        recurrence,
        categoryId,
        accountId,
        amount,
        date: date.toDate(),
        description,
        id: uuidv4()
      })
      .finally(() => props.onClose());
  }

  useEffect(() => {
    if (props.show && amountRef.current) {
      amountRef.current.value = '';
    }
    if (props.show && dateRef.current) {
      dateRef.current.value = dayjs().format('YYYY-MM-DD');
    }
    if (props.show && descriptionRef.current) {
      descriptionRef.current.value = '';
    }
  }, [props.show]);

  return (
    <Modal show={props.show} onClose={props.onClose} size="md">
      <Modal.Header>
        <Trans i18nKey="newTransaction">New Transaction</Trans>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormGroup.Label htmlFor="transactionDate">
              <Trans i18nKey="date">Date</Trans>
            </FormGroup.Label>
            <FormGroup.Input
              type="date"
              placeholder={t('Transaction Date')}
              ref={dateRef}
              id="transactionDate"
            />
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="transactionType">
              <Trans i18nKey="type">Type</Trans>
            </FormGroup.Label>
            <FormGroup.Select ref={typeRef} id="transactionType">
              <option value="EXPENSE">
                <Trans i18nKey="expense">Expense</Trans>
              </option>
              <option value="INCOME">
                <Trans i18nKey="income">Income</Trans>
              </option>
            </FormGroup.Select>
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="transactionAmount">
              <Trans i18nKey="amount">Amount</Trans>
            </FormGroup.Label>
            <FormGroup.Input
              type="number"
              step="0.01"
              placeholder={t('Transaction Amount')}
              id="transactionAmount"
              ref={amountRef}
            />
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="transactionCategory">
              <Trans i18nKey="category">Category</Trans>
            </FormGroup.Label>
            <FormGroup.Select ref={categoryRef} id="transactionCategory">
              {categories.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </FormGroup.Select>
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="transactionAccount">
              <Trans i18nKey="account">Account</Trans>
            </FormGroup.Label>
            <FormGroup.Select ref={accountRef} id="transactionAccount">
              {accounts.map((a) => (
                <option value={a.id} key={a.id}>
                  {a.name}
                </option>
              ))}
            </FormGroup.Select>
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="transactionRecurrence">
              <Trans i18nKey="recurrence">Recurrence</Trans>
            </FormGroup.Label>
            <FormGroup.Select ref={recurrenceRef} id="transactionRecurrence">
              <option value="ONE_TIME">
                <Trans i18nKey="ONE_TIME">One Time</Trans>
              </option>
              <option value="MONTHLY">
                <Trans i18nKey="MONTHLY">Monthly</Trans>
              </option>
            </FormGroup.Select>
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="transactionDescription">
              <Trans i18nKey="description">Description</Trans>
            </FormGroup.Label>
            <FormGroup.Textarea
              ref={descriptionRef}
              rows={3}
              id="transactionDescription"></FormGroup.Textarea>
          </FormGroup>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="primary" type="submit">
              <Trans i18nKey="create">Create</Trans>
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner
              style={{ visibility: props.loading ? 'visible' : 'hidden', margin: '20px 0' }}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
