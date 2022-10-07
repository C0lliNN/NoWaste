import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import Button from '../../components/UI/Button';
import DeleteButton from '../../components/UI/DeleteButton';
import EditButton from '../../components/UI/EditButton';
import ErrorMessage from '../../components/UI/ErrorMessage';
import Spinner from '../../components/UI/Spinner';
import Table from '../../components/UI/Table';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Category from '../../models/category';
import { fetchCategories } from '../../store/categories';
import CreateCategoryModal from '../../components/CreateCategoryModal';
import DeleteCategoryModal from '../../components/DeleteCategoryModal';
import EditCategoryModal from '../../components/EditCategoryModal';
import { Container, Header, Title } from './styles';

export default function Categories(): JSX.Element {
  const { categories, loading, error } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  function handleShowCreateModal(): void {
    setShowCreateModal(true);
  }

  function handleCloseCreateModal(): void {
    setShowCreateModal(false);
  }

  function handleShowEditModal(category: Category): void {
    setShowEditModal(true);
    setSelectedCategory(category);
  }

  function handleCloseEditModal(): void {
    setShowEditModal(false);
    setSelectedCategory(null);
  }

  function handleShowDeleteModal(category: Category): void {
    setShowDeleteModal(true);
    setSelectedCategory(category);
  }

  function handleCloseDeleteModal(): void {
    setShowDeleteModal(false);
    setSelectedCategory(null);
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

      {categories.length > 0 && (
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
                <td>
                  <Trans i18nKey={c.type}>{c.type}</Trans>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <EditButton onClick={() => handleShowEditModal(c)} />
                  <DeleteButton onClick={() => handleShowDeleteModal(c)} />
                </td>
              </tr>
            ))}
          </Table.Body>
        </Table>
      )}

      {!categories.length && (
        <p>
          <Trans i18nKey="noCategories">No categories registered</Trans>
        </p>
      )}

      {loading && <Spinner style={{ marginTop: '20px' }} />}

      <CreateCategoryModal show={showCreateModal} onClose={handleCloseCreateModal} />

      <EditCategoryModal
        show={showEditModal}
        onClose={handleCloseEditModal}
        category={selectedCategory}
      />

      <DeleteCategoryModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        category={selectedCategory}
      />
    </Container>
  );
}
