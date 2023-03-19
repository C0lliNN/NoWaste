import { useEffect } from 'react';
import { Container, Item } from './styles';

const availableColors = [
  '#C89FA3',
  '#5BC0EB',
  '#FDE74C',
  '#9BC53D',
  '#FA7921',
  '#E55934',
  '#DC0073',
  '#9A031E',
  '#000000'
];

interface Props {
  color: string;
  setColor: (color: string) => void;
}

export default function ColorPicker({ color, setColor }: Props): JSX.Element {
  useEffect(() => {
    if (color === '') {
      setColor(availableColors[0]);
    }
  }, [color]);

  return (
    <Container>
      {availableColors.map((c) => (
        <Item key={c}>
          <input
            type="radio"
            name="color"
            id={`${c}_id`}
            value={c}
            checked={color === c}
            onChange={(e) => setColor(e.target.value)}
          />
          <label htmlFor={`${c}_id`} role="radio" style={{ backgroundColor: c }}></label>
        </Item>
      ))}
    </Container>
  );
}
