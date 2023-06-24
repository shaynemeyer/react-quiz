import { useState } from 'react';
import DateCounter from './DateCounter';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <DateCounter />
    </div>
  );
}

export default App;
