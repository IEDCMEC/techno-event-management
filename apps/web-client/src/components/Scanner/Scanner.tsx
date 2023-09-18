import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import styles from './Scanner.module.css';

interface ScannerProps {
  qr_pay: boolean;
  setUserId: (userId: string) => void;
  userId: string;
  setPaymentId: (paymentId: string) => void;
  paymentId: string;
}

const Scanner: React.FC<ScannerProps> = ({
  qr_pay,
  setUserId,
  userId,
  setPaymentId,
  paymentId,
}) => {
  const [result, setResult] = useState<string | null>('');

  const handleScan = (result: string | null) => {
    console.log(result);
    setResult(result || '');
    if (qr_pay) {
      if (result !== null) {
        setPaymentId(result);
      }
    } else {
      if (result !== null) {
        setUserId(result);
      }
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  return (
    <div className={styles.scan_container}>
      <div className={styles.scan}>
        <div className={styles.scan_heading}>Scan the {qr_pay ? 'Payment' : 'Band'} QR code</div>
        <QrReader onScan={handleScan} onError={handleError} style={{ width: '300px' }} />
      </div>

      <div className={styles.text_input}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter code"
          value={qr_pay ? paymentId : userId}
          onChange={(e) => {
            if (qr_pay) {
              setPaymentId(e.target.value);
            } else {
              setUserId(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Scanner;
