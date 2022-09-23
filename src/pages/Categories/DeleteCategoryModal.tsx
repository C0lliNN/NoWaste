import { Trans } from 'react-i18next';
import styled from 'styled-components';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { useAppDispatch } from '../../hooks/hooks';
import Category from '../../models/category';
import { deleteCategory } from '../../store/categories';
import { fireError } from '../../utils/customAlert';

interface Props {
  show: boolean;
  category: Category | null;
  onClose: () => void;
}

export const ConfirmationText = styled.h4`
  font-size: 1.6em;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;

  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    font-size: 1.8em;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

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
            Are you sure you want to delete the category {props.category?.name}?
          </Trans>
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
