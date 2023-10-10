import Scanner from '@/components/Scanner/Scanner';
import { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';

const Home = () => {
  const [result, setResult] = useState('No result');

  const handleScanResult = (scannedResult) => {
    setResult(scannedResult);
  };

  return (
    <main>
      <DashboardLayout>
        <p>Web Client</p>
        <h1>Web Client</h1>
        <Scanner setResult={setResult} result={setResult}/>
        <p>Scanned Result: {result}</p>
      </DashboardLayout>
    </main>
  );
};

export default Home;
