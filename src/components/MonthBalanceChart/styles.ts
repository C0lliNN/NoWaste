import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  h4 {
    font-size: 1em;
    font-weight: 500;
    color: ${(props) => props.theme.darkgray};
    opacity: 0.9;

    @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
      font-size: 1.2em;
    }
  }

  .success {
    color: ${(props) => props.theme.success};
  }

  .danger {
    color: ${(props) => props.theme.danger};
  }
`;
