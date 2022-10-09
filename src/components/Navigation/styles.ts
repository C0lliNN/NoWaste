import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.nav`
  background: #073b4c;
  height: 72px;
  width: 100%;
  position: fixed;
  bottom: 0;

  z-index: 50;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    width: 340px;
    height: 100%;

    z-index: 0;
  }
`;

export const LogoContainer = styled.div`
  margin: 50px 25px;
  display: none;
  align-items: center;
  justify-content: center;

  h1 {
    margin-left: 15px;
    color: #fff;
  }

  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    display: flex;
  }
`;

export const LinkContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    flex-direction: column;
    height: auto;
  }
`;

export const NewTransactionButton = styled.button`
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
  cursor: pointer;
  span {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    order: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    width: 85%;
    max-width: none;
    max-height: none;
    height: 65px;
    box-sizing: border-box;
    margin: 15px auto 35px auto;
    svg {
      width: 40px;
      height: 40px;
    }
    span {
      display: inline-block;
      font-size: 1.8em;
      font-weight: 600;
      color: #fff;
      margin-left: 20px;
    }
  }
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
  &.active,
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    flex-direction: row;
    justify-content: start;
    height: auto;
    height: 70px;
    gap: 20px;
    font-size: 1.8em;
    font-weight: 500;

    svg {
      margin-left: 24px;
    }
  }
`;

export const LogoutDesktopContainer = styled.button`
  display: none;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    display: flex;
    gap: 20px;
    width: 340px;
    padding: 10px 0;
    position: fixed;
    bottom: 0px;
    align-items: center;
  }

  span {
    color: ${(props) => props.theme.danger};
    font-size: 1.8em;
    font-weight: 600;
  }

  img,
  svg:first-child {
    width: 64px;
    height: 64px;
    margin-left: 20px;
    border-radius: 100%;
  }

  svg:first-child {
    display: flex;
    align-items: center;
  }
`;
