import { useState } from 'react';
import Modal from '../../components/UI/Modal';
import { useAppDispatch } from '../../hooks/hooks';
import { logout } from '../../store/auth';
import { Main } from './styles';

export default function Home(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  function handleLogout(): void {
    dispatch(logout());
  }

  return (
    <Main>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <Modal.Header>New Category</Modal.Header>
        <Modal.Body>Test</Modal.Body>
      </Modal>
    </Main>
  );
}
