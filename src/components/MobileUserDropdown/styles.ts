import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    display: none;
  }
`;

export const Trigger = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  border-radius: 100%;
  cursor: pointer;

  img,
  svg {
    width: 48px;
    height: 48px;
    border-radius: 100%;
  }
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownContent = styled.div`
  display: block;
  position: absolute;
  left: -120px;
  top: 10px;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
`;

export const LogoutButton = styled.button`
  border: none;
  color: ${(props) => props.theme.danger};
  font-size: 1.1em;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;
