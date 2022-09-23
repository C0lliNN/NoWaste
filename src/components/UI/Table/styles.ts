import styled from 'styled-components';

export const Container = styled.table`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 850px;
  border-spacing: 0;
`;

export const TableHeader = styled.thead`
  th {
    text-align: center;
    font-size: 0.9em;
    background-color: ${(props) => props.theme.gray};
    font-weight: 500;
    padding: 8px 12px;
    &:first-child {
      border-radius: 12px 0 0 0;
    }
    &:last-child {
      border-radius: 0 12px 0 0;
    }
    @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
      font-size: 1em;
    }
  }
`;

export const TableBody = styled.tbody`
  td,
  th {
    border-bottom: 1px solid ${(props) => props.theme.gray};
    font-size: 0.8em;
    padding: 6px 12px;
    @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
      font-size: 1em;
      padding: 8px 12px;
    }
  }

  tr:last-child td,
  tr:last-child th {
    border-bottom: none;
  }
`;
