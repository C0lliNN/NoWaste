import { SyntheticEvent, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../../components/UI/Button';
import FormGroup from '../../components/UI/FormGroup';
import Modal from '../../components/UI/Modal';
import Spinner from '../../components/UI/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { CategoryType } from '../../models/category';
import { createCategory } from '../../store/categories';
import { fireError } from '../../utils/customAlert';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function CreateCategoryModal(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const { loading } = useAppSelector((state) => state.categories);
  const { t } = useTranslation();

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();

    const name = nameRef.current?.value as string;
    const type = typeRef.current?.value as CategoryType;

    dispatch(createCategory({ name, type }))
      .then(props.onClose)
      .catch((err: Error) => fireError(err.message));
  }

  return (
    <Modal show={props.show} onClose={props.onClose} size="md">
      <Modal.Header>
        <Trans i18nKey="newCategory">New Category</Trans>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormGroup.Label>
              <Trans i18nKey="name">Name</Trans>
            </FormGroup.Label>
            <FormGroup.Input placeholder={t('Category Name')} ref={nameRef} />
          </FormGroup>
          <FormGroup>
            <FormGroup.Label>
              <Trans i18nKey="type">Type</Trans>
            </FormGroup.Label>
            <FormGroup.Select ref={typeRef}>
              <option value="EXPENSE">
                <Trans i18nKey="expense">Expense</Trans>
              </option>
              <option value="INCOME">
                <Trans i18nKey="income">Income</Trans>
              </option>
            </FormGroup.Select>
          </FormGroup>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="primary" type="submit">
              <Trans i18nKey="create">Create</Trans>
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner style={{ visibility: loading ? 'visible' : 'hidden', margin: '20px 0' }} />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
