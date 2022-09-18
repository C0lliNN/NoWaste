import { StyledComponent } from 'styled-components';
import { Container, Input, Label, Select, Textarea } from './styles';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

interface SubComponents {
  Label: StyledComponent<'label', any, {}, never>;
  Input: StyledComponent<'input', any, {}, never>;
  Select: StyledComponent<'select', any, {}, never>;
  Textarea: StyledComponent<'textarea', any, {}, never>;
}

const FormGroup: React.FC<Props> & SubComponents = (props: Props) => {
  return <Container>{props.children}</Container>;
};

FormGroup.Label = Label;
FormGroup.Input = Input;
FormGroup.Select = Select;
FormGroup.Textarea = Textarea;

export default FormGroup;
