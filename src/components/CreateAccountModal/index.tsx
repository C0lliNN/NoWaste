import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { createAccount } from '../../store/accounts';
import { fireError } from '../../utils/customAlert';
import Button from '../UI/Button';
import ColorPicker from '../UI/ColorPicker';
import FormGroup from '../UI/FormGroup';
import Modal from '../UI/Modal';
import Spinner from '../UI/Spinner';
import { ButtonContainer, SpinnerContainer } from './styles';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function CreateAccountModal(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const balanceRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState('');
  const { loading } = useAppSelector((state) => state.accounts);
  const { t } = useTranslation();

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();

    const name = nameRef.current?.value as string;
    const balance = parseFloat(balanceRef.current?.value as string);

    dispatch(createAccount({ name, balance, color }))
      .then(props.onClose)
      .catch((err: Error) => fireError(err.message));
  }

  useEffect(() => {
    if (props.show && nameRef.current) {
      nameRef.current.value = '';
      nameRef.current.focus();
    }
    if (props.show && balanceRef.current) {
      balanceRef.current.value = '';
    }
  }, [props.show]);

  return (
    <Modal show={props.show} onClose={props.onClose} size="md">
      <Modal.Header>
        <Trans i18nKey="newAccount">New Account</Trans>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormGroup.Label htmlFor="accountName">
              <Trans i18nKey="name">Name</Trans>
            </FormGroup.Label>
            <FormGroup.Input placeholder={t('Account Name')} ref={nameRef} id="accountName" />
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="accountBalance">
              <Trans i18nKey="balance">Balance</Trans>
            </FormGroup.Label>
            <FormGroup.Input
              type="number"
              step="0.01"
              placeholder={t('Account Balance')}
              ref={balanceRef}
              id="accountBalance"
            />
          </FormGroup>
          <FormGroup>
            <FormGroup.Label>
              <Trans i18nKey="color">Color</Trans>
            </FormGroup.Label>
            <ColorPicker color={color} setColor={setColor} />
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
