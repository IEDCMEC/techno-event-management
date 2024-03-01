import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Box } from '@chakra-ui/react';

const Scanner = ({ result, setResult }) => {
  const handleScan = (result) => {
    if (result) {
      setResult(result?.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <QrReader
      height="100%"
      width="100%"
      constraints={{ facingMode: 'environment' }}
      onResult={handleScan}
      onError={handleError}
    />
  );
};

export default Scanner;
