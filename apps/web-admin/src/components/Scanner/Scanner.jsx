import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Text } from '@chakra-ui/react';
const Scanner = ({ result, setResult }) => {
  const handleScan = (result) => {
    console.log(result);
    setResult(result || '');
    //call checkin function
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <QrReader onResult={handleScan} onError={handleError} />
      <Text>{JSON.stringify(result)}</Text>
    </div>
  );
};

export default Scanner;
