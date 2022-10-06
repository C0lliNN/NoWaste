import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  align-self: center;
  height: 100%;
`;

export const TotalBalance = styled.h4`
  text-align: center;
  margin-bottom: 10px;
  color: ${(props) => props.theme.darkgray};
  font-size: 2em;
  font-weight: 500;
  margin-top: 20px;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    font-size: 2.5em;
    margin-bottom: 15px;
  }
`;

export const MonthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px 0;
  width: 100%;
`;

export const Text = styled.h5`
  font-size: 0.8em;
  color: ${(props) => props.theme.darkgray};
  text-transform: capitalize;
  opacity: 0.5;
  font-weight: 600;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    font-size: 1em;
  }
`;

const monthStyles = `
  display: flex;
  gap: 10px;
  align-items: center;
  h4 {
    font-size: 1.2em;
    font-weight: 500;
  }
`;

export const MonthIncome = styled.div`
  color: ${(props) => props.theme.success};
  ${monthStyles}
  h4 {
    @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
      font-size: 1.5em;
    }
  }
`;

export const MonthExpense = styled.div`
  color: ${(props) => props.theme.danger};
  ${monthStyles}
  h4 {
    @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
      font-size: 1.5em;
    }
  }
`;
