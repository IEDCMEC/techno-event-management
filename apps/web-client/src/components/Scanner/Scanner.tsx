import React from 'react';
import { QrReader } from 'react-qr-reader';

interface ScannerProps {
  result: String;
  setResult: React.Dispatch<React.SetStateAction<string>>;
}

const Scanner: React.FC<ScannerProps> = ({ result, setResult }) => {
  const handleScan = (result: string | null) => {
    console.log(result);
    setResult(result || '');
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  return (
    <div>
      <QrReader onResult={handleScan} onError={handleError} />
    </div>
  );
};

export default Scanner;
