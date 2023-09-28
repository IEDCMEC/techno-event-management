import Scanner from '@/components/Scanner/Scanner';

import { useState } from 'react';

const Home = () => {
  const [result, setResult] = useState('No result');

  return (
    <main>
      <h1>Web Client</h1>

      <Scanner result={result} setResult={setResult} />
      {result}
    </main>
  );
};

export default Home;
