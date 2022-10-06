import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
  padding: 10px;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    padding: 20px;
  }
`;

export default Card;
