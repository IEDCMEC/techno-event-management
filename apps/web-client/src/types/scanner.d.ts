declare module 'react-qr-reader' {
  import * as React from 'react';

  interface QrReaderProps {
    onResult: (data: string | null) => void;
    onError: (error: Error) => void;
    // Add other props as needed
  }

  export const QrReader: React.FC<QrReaderProps>;
  
}
