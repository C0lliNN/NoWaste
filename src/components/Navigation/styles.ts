import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.nav`
  background: #073b4c;
  height: 72px;
  width: 100%;
  position: fixed;
  bottom: 0;
`;

export const MobileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const NewTransactionMobileButton = styled.button`
  background-color: ${(props) => props.theme.success};
  outline: none;
  border: none;
  border-radius: 100%;
  width: 100%;
  height: 100%;
  max-width: 56px;
  margin: 0 8px;
  max-height: 56px;
  align-self: center;
`;

export const Link = styled(NavLink)`
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0;
  font-size: 0.8em;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  &.active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
