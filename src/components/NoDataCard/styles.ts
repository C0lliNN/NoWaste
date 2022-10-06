import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.h4`
  text-align: center;
  font-weight: 400;
  color: ${(props) => props.theme.darkgray};
  font-size: 1.2em;
`;
