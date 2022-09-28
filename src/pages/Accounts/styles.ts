import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    padding: 30px;
  }
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

export const DeleteButton = styled.button`
  ${iconButtonStyles}
`;