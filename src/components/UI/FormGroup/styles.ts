/* eslint-disable @typescript-eslint/restrict-template-expressions */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
  margin: 12px auto;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    margin: 16px auto;
  }
`;

export const Label = styled.label`
  font-size: 0.9em;
  @media (min-width: ${(props) => props.theme.lgBreakpoint}) {
    font-size: 1em;
  }
`;

const controlProperties = `
  outline: none;
  border: none;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  font-size: 1em;
  box-sizing: border-box;
  padding: 10px 12px;
  width: 100%;
  transition: all 0.3s ease-in-out;
  &:focus {
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.2);
  }
  @media (min-width: ${(props: any) => props.theme.lgBreakpoint}) {
    padding: 12px 20px;
    font-size: 1.1em;
    border-radius: 8px;
    &:focus {
      box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, 0.2);
    }
  }
`;

export const Input = styled.input`
  ${controlProperties}
`;

export const Select = styled.select`
  ${controlProperties}
`;

export const Textarea = styled.textarea`
  ${controlProperties}
`;
