import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import Button from '../../components/UI/Button';
import DeleteButton from '../../components/UI/DeleteButton';
import EditButton from '../../components/UI/EditButton';
import ErrorMessage from '../../components/UI/ErrorMessage';
import Spinner from '../../components/UI/Spinner';
import Table from '../../components/UI/Table';
import useAppSelector from '../../hooks/useAppSelector';
import { Account } from '../../models/account';
import { fetchAccounts } from '../../store/accounts';
import CreateAccountModal from '../../components/CreateAccountModal';
import DeleteAccountModal from '../../components/DeleteAccountModal';
import EditAccountModal from '../../components/EditAccountModal';
import { Container, Header, NameCell, Title } from './styles';
import useAppDispatch from '../../hooks/useAppDispatch';
import useFormatCurrency from '../../hooks/useFormatCurrency';

export default function Accounts(): JSX.Element {
  const { accounts, loading, error } = useAppSelector((state) => state.accounts);
  const dispatch = useAppDispatch();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const formatCurrency = useFormatCurrency();

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
                <Trans i18nKey="balance">Balance</Trans>
              </th>
              <th>
                <Trans i18nKey="actions">Actions</Trans>
              </th>
            </tr>
          </Table.Header>
          <Table.Body>
            {accounts.map((account) => (
              <tr key={account.id}>
                <NameCell>
                  <div>
                    <span>{account.name}</span>
                    <div style={{ backgroundColor: account.color }} className="color"></div>
                  </div>
                </NameCell>
                <td>{formatCurrency(account.balance)}</td>
                <td style={{ textAlign: 'center' }}>
                  <EditButton onClick={() => handleShowEditModal(account)} />
                  <DeleteButton onClick={() => handleShowDeleteModal(account)} />
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
