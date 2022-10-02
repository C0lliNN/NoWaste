import { useTheme } from 'styled-components';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { Button } from './styles';

interface Props {
  onClick: () => void;
}

export default function EditButton({ onClick }: Props): JSX.Element {
  const theme: any = useTheme();
  return (
    <Button onClick={onClick}>
      <EditIcon fill={theme.secondary} />
    </Button>
  );
}
