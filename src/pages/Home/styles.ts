import styled from 'styled-components';

export const Main = styled.main`
  background-color: #f4f4f4;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    margin-left: 340px;
  }
`;
