import { SyntheticEvent, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../../components/UI/Button';
import FormGroup from '../../components/UI/FormGroup';
import Modal from '../../components/UI/Modal';
import Spinner from '../../components/UI/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { createAccount } from '../../store/accounts';
import { fireError } from '../../utils/customAlert';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function CreateAccountModal(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const { loading } = useAppSelector((state) => state.accounts);
  const { t } = useTranslation();

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();

    const name = nameRef.current?.value as string;

    dispatch(createAccount({ name }))
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
        <Trans i18nKey="newAccount">New Account</Trans>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormGroup.Label>
              <Trans i18nKey="name">Name</Trans>
            </FormGroup.Label>
            <FormGroup.Input placeholder={t('Account Name')} ref={nameRef} />
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