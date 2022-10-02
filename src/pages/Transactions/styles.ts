import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    padding: 30px;
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  width: 100%;
  max-width: 850px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    margin-bottom: 30px;
  }
`;

export const Title = styled.h2`
  font-size: 1.5em;
  color: ${(props) => props.theme.darkgray};
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    font-size: 2em;
  }
`;

export const FilterContainer = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 20px;

  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    flex-direction: row;
    align-items: center;
  }

  & > div {
    margin: 0;
  }
`;

const iconButtonStyles = `
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;

export const EditButton = styled.button`
  ${iconButtonStyles}
  margin-right: 10px;
`;
