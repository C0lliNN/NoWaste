import { StyledComponent } from 'styled-components';
import { Container, TableBody, TableHeader } from './styles';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

interface SubComponents {
  Header: StyledComponent<'div', any, {}, never>;
  Body: StyledComponent<'div', any, {}, never>;
}

const Table: React.FC<Props> & SubComponents = (props: Props) => {
  return <Container>{props.children}</Container>;
};

Table.Header = TableHeader;
Table.Body = TableBody;

export default Table;
