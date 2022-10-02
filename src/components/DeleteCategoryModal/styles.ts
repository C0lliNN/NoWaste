import styled from 'styled-components';

export const ConfirmationText = styled.h4`
  font-size: 1.4em;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;

  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    font-size: 1.8em;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
