import { useState } from 'react';
import Modal from '../../components/UI/Modal';
import Table from '../../components/UI/Table';
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
      <Table>
        <Table.Header>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Col 1</th>
            <th scope="col">Col 2</th>
            <th scope="col">Col 3</th>
            <th scope="col">Col 4</th>
            <th scope="col">Col 5</th>
          </tr>
        </Table.Header>
        <Table.Body>
          <tr>
            <th scope="row">1</th>
            <td>Raphael</td>
            <td>Dev</td>
            <td>Dev</td>
            <td>Dev</td>
            <td>Dev</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Philippe</td>
            <td>Industry</td>
            <td>Industry</td>
            <td>Industry</td>
            <td>Industry</td>
          </tr>
        </Table.Body>
      </Table>
    </Main>
  );
}
