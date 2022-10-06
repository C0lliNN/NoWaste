import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Text = styled.h3`
  text-align: center;
  font-weight: 500;
  font-size: 1.4em;
  color: ${(props) => props.theme.darkgray};
`;
