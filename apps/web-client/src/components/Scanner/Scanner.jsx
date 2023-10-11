import { QrReader } from 'react-qr-reader';
import { useState } from 'react';

const Scanner = ({ result, setResult }) => {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            setData(result?.text);
            setResult(result?.text);
          }

          if (error) {
            console.info(error);
          }
        }}
        style={{ width: '50%' }}
      />
      <p>{data}</p>
    </>
  );
};

export default Scanner;
