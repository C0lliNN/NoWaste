import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  margin: 20px 10px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.gray};
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h4`
  color: ${(props) => props.theme.danger};
  margin-bottom: 5px;
`;

export const Message = styled.p`
  color: ${(props) => props.theme.danger};
`;
