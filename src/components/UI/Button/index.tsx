import styled from 'styled-components';

const variants = {
  primary: '#073B4C',
  secondary: '#118AB2',
  success: '#06D6A0',
  warning: '#FFD166',
  danger: '#EF476F',
  gray: '#dddddd',
  darkgray: '#303030'
};

interface Props {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray' | 'darkgray';
}

const Button = styled.button<Props>`
  background: ${(props) => variants[props.variant]};
  color: #fff;
  font-size: 1em;
  font-weight: 500;
  padding: 15px 20px;
  border: none;
  outline: none;
  border-radius: 8px;
`;

export default Button;
