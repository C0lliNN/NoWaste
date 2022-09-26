import styled from 'styled-components';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  z-index: ${(props) => (props.show ? '1' : '-1')};
  background-color: transparent;
  align-items: center;
  justify-content: center;
  position: fixed;
  display: flex;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;

interface BackdropProps {
  show: boolean;
}

export const Backdrop = styled.div<BackdropProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.4s ease-in-out;
  background-color: ${(props) => (props.show ? 'rgba(0, 0, 0, 0.5)' : 'transparent')};
`;

interface ModalProps {
  show: boolean;
  size: 'sm' | 'md';
}

export const ModalContainer = styled.div<ModalProps>`
  position: relative;
  background-color: #fff;
  z-index: 100;
  ${(props) => {
    switch (props.size) {
      case 'sm':
        return `width: 60%;
                min-height: 100px;
                max-width: 500px;`;
      default:
        return `width: 85%;
                min-height: 450px;
                max-width: 850px;`;
    }
  }}

  border-radius: 12px;
  transition: all 0.2s ease-in-out;
  transform: translateY(${(props) => (props.show ? '0' : '-100vh')});
`;

export const ModalHeader = styled.div`
  border-radius: 12px 12px 0 0;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5em;
  font-weight: 600;
  color: ${(props) => props.theme.darkgray};
  font-family: 'Open Sans', sans-serif;
  border-bottom: 1px solid ${(props) => props.theme.gray};
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    font-size: 2em;
    font-weight: 600;
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
`;
