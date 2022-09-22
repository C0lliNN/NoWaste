import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/UI/ErrorMessage';
import Spinner from '../../components/UI/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCategories } from '../../store/categories';
import CreateCategoryModal from './CreateCategoryModal';

export default function Categories(): JSX.Element {
  const { categories, loading, error } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  const [showCreateModal, setShowCreateModal] = useState(false);

  console.log(error);

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
    <div>
      <h2>Categories</h2>
      {error && <ErrorMessage message={error} />}
      {loading ? (
        <div style={{ margin: '20px 0', width: '100%', display: `flex`, justifyContent: 'center' }}>
          <Spinner />
        </div>
      ) : (
        <div>
          <button onClick={handleShowCreateModal}>New category</button>
          <ul>
            {categories.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
        </div>
      )}
      <CreateCategoryModal show={showCreateModal} onClose={handleCloseCreateModal} />
    </div>
  );
}
