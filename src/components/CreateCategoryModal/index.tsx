import { SyntheticEvent, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../UI/Button';
import FormGroup from '../UI/FormGroup';
import Modal from '../UI/Modal';
import Spinner from '../UI/Spinner';
import useAppSelector from '../../hooks/useAppSelector';
import { CategoryType } from '../../models/category';
import { createCategory } from '../../store/categories';
import { fireError } from '../../utils/customAlert';
import { ButtonContainer, SpinnerContainer } from './styles';
import useAppDispatch from '../../hooks/useAppDispatch';

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

  useEffect(() => {
    if (props.show && nameRef.current) {
      nameRef.current.value = '';
    }
  }, [props.show]);

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
          <ButtonContainer>
            <Button variant="primary" type="submit">
              <Trans i18nKey="create">Create</Trans>
            </Button>
          </ButtonContainer>
          <SpinnerContainer>
            <Spinner style={{ visibility: loading ? 'visible' : 'hidden', margin: '20px 0' }} />
          </SpinnerContainer>
        </form>
      </Modal.Body>
    </Modal>
  );
}
