import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Text } from '@chakra-ui/react';

const Scanner = ({ result, setResult }) => {
  const handleScan = (result) => {
    if (result) {
      console.log(result);
      setResult(result?.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={handleScan}
        onError={handleError}
      />
    </div>
  );
};

export default Scanner;
