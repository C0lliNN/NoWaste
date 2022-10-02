import { useTheme } from 'styled-components';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { Button } from './styles';

interface Props {
  onClick: () => void;
}

export default function DeleteButton({ onClick }: Props): JSX.Element {
  const theme: any = useTheme();
  return (
    <Button onClick={onClick}>
      <DeleteIcon fill={theme.danger} />
    </Button>
  );
}
