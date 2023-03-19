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

function generateRandomString(): string {
  return (Math.random() + 1).toString(36).substring(7);
}

export default function ColorPicker({ color, setColor }: Props): JSX.Element {
  useEffect(() => {
    if (color === '') {
      setColor(availableColors[0]);
    }
  }, [color]);

  // This is necessary to prevent collisions when more than one instance of this component is rendered
  // at the same time
  const randomString = generateRandomString();

  return (
    <Container>
      {availableColors.map((c) => (
        <Item key={c}>
          <input
            type="radio"
            name={`picker_${randomString}`}
            id={`${c}_id_${randomString}`}
            value={c}
            checked={color === c}
            onChange={(e) => setColor(e.target.value)}
          />
          <label
            htmlFor={`${c}_id_${randomString}`}
            role="radio"
            style={{ backgroundColor: c }}></label>
        </Item>
      ))}
    </Container>
  );
}
