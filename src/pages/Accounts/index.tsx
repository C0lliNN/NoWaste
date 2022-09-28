import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useTheme } from 'styled-components';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import Button from '../../components/UI/Button';
import ErrorMessage from '../../components/UI/ErrorMessage';
import Spinner from '../../components/UI/Spinner';
import Table from '../../components/UI/Table';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Account } from '../../models/account';
import { fetchAccounts } from '../../store/accounts';
import CreateAccountModal from './CreateAccountModal';
import DeleteAccountModal from './DeleteAccountModal';
import EditAccountModal from './EditAccountModal';
import { Container, DeleteButton, EditButton, Header, Title } from './styles';

export default function Accounts(): JSX.Element {
  const { accounts, loading, error } = useAppSelector((state) => state.accounts);
  const dispatch = useAppDispatch();
  const theme: any = useTheme();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  function handleShowCreateModal(): void {
    setShowCreateModal(true);
  }

  function handleCloseCreateModal(): void {
    setShowCreateModal(false);
  }

  function handleShowEditModal(account: Account): void {
    setShowEditModal(true);
    setSelectedAccount(account);
  }

  function handleCloseEditModal(): void {
    setShowEditModal(false);
    setSelectedAccount(null);
  }

  function handleShowDeleteModal(account: Account): void {
    setShowDeleteModal(true);
    setSelectedAccount(account);
  }

  function handleCloseDeleteModal(): void {
    setShowDeleteModal(false);
    setSelectedAccount(null);
  }

  useEffect(() => {
    void dispatch(fetchAccounts());
  }, []);

  return (
    <Container>
      <Header>
        <Title>
          <Trans i18nKey="accounts">Accounts</Trans>
        </Title>
        <Button variant="success" onClick={handleShowCreateModal}>
          <Trans i18nKey="newAccount">New Account</Trans>
        </Button>
      </Header>

      {error && <ErrorMessage message={error} />}

      {accounts.length > 0 && (
        <Table>
          <Table.Header>
            <tr>
              <th>
                <Trans i18nKey="name">Name</Trans>
              </th>
              <th>
                <Trans i18nKey="actions">Actions</Trans>
              </th>
            </tr>
          </Table.Header>
          <Table.Body>
            {accounts.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td style={{ textAlign: 'center' }}>
                  <EditButton onClick={() => handleShowEditModal(c)}>
                    <EditIcon fill={theme.secondary} />
                  </EditButton>
                  <DeleteButton onClick={() => handleShowDeleteModal(c)}>
                    <DeleteIcon fill={theme.danger} />
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </Table.Body>
        </Table>
      )}

      {!accounts.length && (
        <p>
          <Trans i18nKey="noAccounts">No accounts registered</Trans>
        </p>
      )}

      {loading && <Spinner style={{ marginTop: '20px' }} />}

      <CreateAccountModal show={showCreateModal} onClose={handleCloseCreateModal} />

      <EditAccountModal
        show={showEditModal}
        onClose={handleCloseEditModal}
        account={selectedAccount}
      />

      <DeleteAccountModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        account={selectedAccount}
      />
    </Container>
  );
}
