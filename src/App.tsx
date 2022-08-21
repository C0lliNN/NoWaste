import React from 'react';
import Button from './components/Button';

function App() {
  const [counter, setCounter] = React.useState<number>(0);

  function increment() {
    setCounter((c) => c + 1);
  }

  function decrement() {
    setCounter((c) => c - 1);
  }

  return (
    <div>
      <p>Counter: {counter}</p>
      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
    </div>
  );
}

export default App;
