import dayjs from 'dayjs';
import { SyntheticEvent, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import useFilteredCategories from '../../hooks/useFilteredCategories';
import { Transaction } from '../../models/transaction';
import { UpdateTransactionRequest } from '../../services/api';
import Button from '../UI/Button';
import FormGroup from '../UI/FormGroup';
import Modal from '../UI/Modal';
import Spinner from '../UI/Spinner';
import { ButtonContainer, SpinnerContainer } from './styles';

interface Props {
  show: boolean;
  loading: boolean;
  transaction: Transaction | null;
  onUpdate: (req: UpdateTransactionRequest) => Promise<void>;
  onClose: () => void;
}

export default function EditTransactionModal(props: Props): JSX.Element {
  const categoryRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const filteredCategories = useFilteredCategories(props.transaction?.type);

  const { t } = useTranslation();

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();

    const categoryId = categoryRef.current?.value as string;
    const amount = Number(amountRef.current?.value);
    const date = dayjs(dateRef.current?.value as string);
    date.set('hour', 12);

    props
      .onUpdate({
        categoryId,
        amount,
        date: date.toDate(),
        transactionId: props.transaction?.id as string
      })
      .finally(props.onClose);
  }

  useEffect(() => {
    if (categoryRef.current && props.transaction) {
      categoryRef.current.value = props.transaction.category.id;
    }
    if (amountRef.current && props.transaction) {
      amountRef.current.value = props.transaction.amount.toString();
    }
    if (dateRef.current && props.transaction) {
      dateRef.current.value = dayjs(props.transaction.date).format('YYYY-MM-DD');
    }
  }, [props.transaction]);

  return (
    <Modal show={props.show} onClose={props.onClose} size="md">
      <Modal.Header>
        <Trans i18nKey="editTransaction">Edit Transaction</Trans>
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
              defaultValue={dayjs(props.transaction?.date).format('YYYY-MM-DD') ?? ''}
            />
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
              defaultValue={props.transaction?.amount ?? ''}
            />
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="transactionCategory">
              <Trans i18nKey="category">Category</Trans>
            </FormGroup.Label>
            <FormGroup.Select
              ref={categoryRef}
              id="transactionCategory"
              defaultValue={props.transaction?.category.id}>
              {filteredCategories.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </FormGroup.Select>
          </FormGroup>

          <ButtonContainer>
            <Button variant="secondary" type="submit">
              <Trans i18nKey="update">Update</Trans>
            </Button>
          </ButtonContainer>
          <SpinnerContainer>
            <Spinner
              style={{ visibility: props.loading ? 'visible' : 'hidden', margin: '20px 0' }}
            />
          </SpinnerContainer>
        </form>
      </Modal.Body>
    </Modal>
  );
}
