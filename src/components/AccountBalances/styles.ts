import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.darkgray};
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.2em;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    font-size: 1.5em;
    margin-bottom: 20px;
  }
`;

export const List = styled.ul`
  list-style: none;
`;

export const Item = styled.li`
  color: ${(props) => props.theme.darkgray};
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px auto;

  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    font-size: 1.2em;
  }

  h4 {
    font-weight: 500;
    opacity: 0.9;
  }
  .success {
    color: ${(props) => props.theme.success};
  }
  .danger {
    color: ${(props) => props.theme.danger};
  }
`;
