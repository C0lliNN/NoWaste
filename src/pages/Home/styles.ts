import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    padding: 30px;
  }
`;

export const Header = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    margin-bottom: 30px;
  }
`;

export const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: ${(props) => props.theme.darkgray};
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    font-size: 2em;
  }
`;

export const MonthContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  text-align: center;
`;

export const MonthSelect = styled.select`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2em;
  font-weight: 500;
  padding: 0px 20px;
  border: none;
  outline: none;
  background: transparent;
`;

export const SpinnerContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatsContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  gap: 20px;

  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    flex-wrap: wrap;
    margin: 30px 0;
  }

  & > div {
    @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
      width: 45%;
    }
  }
`;