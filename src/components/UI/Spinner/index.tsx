import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
`;

const Spinner = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 9px solid;
  border-color: #cfdcd9;
  border-right-color: #06d6a0;
  animation: ${rotate} 1s infinite linear;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    width: 72px;
    height: 72px;
  }
`;

export default Spinner;
