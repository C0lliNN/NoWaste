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

export const DateFilterContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  text-align: center;
`;

export const Select = styled.select`
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
  max-width: 1000px;
  margin: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatsContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-auto-rows: 1fr;
  margin: 30px auto;
  gap: 20px;

  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 2fr;
    margin: 30px 0;
  }
`;
