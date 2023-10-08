import React from 'react';
import { QrReader } from 'react-qr-reader';

const Scanner = ({ result, setResult }) => {
  const handleScan = (result) => {
    console.log(result);
    setResult(result || '');
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <QrReader onResult={handleScan} onError={handleError} />
    </div>
  );
};

export default Scanner;
