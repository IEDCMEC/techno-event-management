import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useZxing } from 'react-zxing';

const Scanner = ({ result, setResult }) => {
  const handleScan = (result) => {
    if (result) {
      setResult(result?.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });
  return (
    // <QrReader
    //   height="100%"
    //   width="100%"
    //   constraints={{ facingMode: 'environment' }}
    //   onResult={handleScan}
    //   onError={handleError}
    // />
    <video ref={ref} style={{ height: '100%', width: '100%' }} onError={handleError} />
  );
};

export default Scanner;
