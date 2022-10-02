import { Trans } from 'react-i18next';
import { useAppDispatch } from '../../hooks/hooks';
import { Account } from '../../models/account';
import { deleteAccount } from '../../store/accounts';
import { fireError } from '../../utils/customAlert';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { ButtonContainer, ConfirmationText } from './styles';

interface Props {
  show: boolean;
  account: Account | null;
  onClose: () => void;
}

export default function DeleteAccountModal(props: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function handleConfirmDelete(): void {
    dispatch(deleteAccount(props.account as Account))
      .then(props.onClose)
      .catch((err: Error) => fireError(err.message));
  }

  return (
    <Modal show={props.show} onClose={props.onClose} size="sm">
      <Modal.Body>
        <ConfirmationText>
          <Trans i18nKey="deleteAccountConfirmation">
            Are you sure you want to delete the account {props.account?.name}?
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
