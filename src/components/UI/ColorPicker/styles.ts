import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

export const Item = styled.div`
  input {
    display: none;
    &:checked + label {
      transform: scale(120%);
    }
  }
  label {
    cursor: pointer;
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    transition: all 0.2s ease-in-out;
    @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
      width: 40px;
      height: 40px;
    }
  }
`;
