import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Box } from '@chakra-ui/react';

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
    <Box height="100%" width="100%">
      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={handleScan}
        onError={handleError}
      />
    </Box>
  );
};

export default Scanner;
