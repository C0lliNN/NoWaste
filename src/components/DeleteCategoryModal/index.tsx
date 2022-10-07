import { Trans } from 'react-i18next';
import { useAppDispatch } from '../../hooks/hooks';
import Category from '../../models/category';
import { deleteCategory } from '../../store/categories';
import { fireError } from '../../utils/customAlert';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { ButtonContainer, ConfirmationText } from './styles';

interface Props {
  show: boolean;
  category: Category | null;
  onClose: () => void;
}

export default function DeleteCategoryModal(props: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function handleConfirmDelete(): void {
    dispatch(deleteCategory(props.category as Category))
      .then(props.onClose)
      .catch((err: Error) => fireError(err.message));
  }

  return (
    <Modal show={props.show} onClose={props.onClose} size="sm">
      <Modal.Body>
        <ConfirmationText>
          <Trans i18nKey="deleteCategoryConfirmation">
            Are you sure you want to delete the category
          </Trans>
          {props.category?.name}?
        </ConfirmationText>
        <ButtonContainer>
          <Button variant="darkgray" onClick={props.onClose}>
            <Trans i18nKey="cancel">Cancel</Trans>
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            <Trans i18nKey="delete">Delete</Trans>
          </Button>
        </ButtonContainer>
      </Modal.Body>
    </Modal>
  );
}
