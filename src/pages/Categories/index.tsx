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
import { fetchCategories } from '../../store/categories';
import CreateCategoryModal from './CreateCategoryModal';
import { Container, DeleteButton, EditButton, Header, Title } from './styles';

export default function Categories(): JSX.Element {
  const { categories, loading, error } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  const theme: any = useTheme();

  const [showCreateModal, setShowCreateModal] = useState(false);

  function handleShowCreateModal(): void {
    setShowCreateModal(true);
  }

  function handleCloseCreateModal(): void {
    setShowCreateModal(false);
  }

  useEffect(() => {
    void dispatch(fetchCategories());
  }, []);

  return (
    <Container>
      <Header>
        <Title>
          <Trans i18nKey="categories">Categories</Trans>
        </Title>
        <Button variant="success" onClick={handleShowCreateModal}>
          <Trans i18nKey="newCategory">New Category</Trans>
        </Button>
      </Header>

      {error && <ErrorMessage message={error} />}

      <Table>
        <Table.Header>
          <tr>
            <th>
              <Trans i18nKey="name">Name</Trans>
            </th>
            <th>
              <Trans i18nKey="type">Type</Trans>
            </th>
            <th>
              <Trans i18nKey="actions">Actions</Trans>
            </th>
          </tr>
        </Table.Header>
        <Table.Body>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.type}</td>
              <td style={{ textAlign: 'center' }}>
                <EditButton>
                  <EditIcon fill={theme.secondary} />
                </EditButton>
                <DeleteButton>
                  <DeleteIcon fill={theme.danger} />
                </DeleteButton>
              </td>
            </tr>
          ))}
        </Table.Body>
      </Table>

      {loading && <Spinner style={{ marginTop: '20px' }} />}

      <CreateCategoryModal show={showCreateModal} onClose={handleCloseCreateModal} />
    </Container>
  );
}
