import { useState } from 'react';
import FormGroup from '../../components/UI/FormGroup';
import Modal from '../../components/UI/Modal';
import Table from '../../components/UI/Table';
import { useAppDispatch } from '../../hooks/hooks';
import { logout } from '../../store/auth';

export default function Home(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  function handleLogout(): void {
    dispatch(logout());
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      <Modal
        show={showModal}
        size="md"
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
      <form style={{ padding: '20px' }}>
        <FormGroup>
          <FormGroup.Label htmlFor="input1">Label 1</FormGroup.Label>
          <FormGroup.Input id="input1" placeholder="Some test" />
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="input2">Label 1</FormGroup.Label>
          <FormGroup.Select id="input2">
            <option>1</option>
            <option>2</option>
          </FormGroup.Select>
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="input3">Label 1</FormGroup.Label>
          <FormGroup.Textarea id="input3"></FormGroup.Textarea>
        </FormGroup>
      </form>
    </div>
  );
}
