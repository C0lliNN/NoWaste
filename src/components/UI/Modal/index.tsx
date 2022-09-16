import { StyledComponent } from 'styled-components';
import { Backdrop, Container, ModalBody, ModalContainer, ModalHeader } from './styles';

interface Props {
  onClose: () => void;
  show: boolean;
  children?: JSX.Element | JSX.Element[];
}

interface SubComponents {
  Header: StyledComponent<'div', any, {}, never>;
  Body: StyledComponent<'div', any, {}, never>;
}

const Modal: React.FC<Props> & SubComponents = (props: Props) => {
  return (
    <Container show={props.show}>
      <Backdrop onClick={props.onClose} show={props.show} />
      <ModalContainer show={props.show}>{props.children}</ModalContainer>
    </Container>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;

export default Modal;
