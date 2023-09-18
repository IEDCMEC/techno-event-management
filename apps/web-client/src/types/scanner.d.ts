declare module 'react-qr-reader' {
  import * as React from 'react';

  interface QrReaderProps {
    onScan: (data: string | null) => void;
    onError: (error: Error) => void;
    // Add other props as needed
  }

  const QrReader: React.FC<QrReaderProps>;
  export default QrReader;
}
