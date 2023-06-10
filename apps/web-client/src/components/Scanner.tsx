import { useZxing } from 'react-zxing';

interface ScannerProps {
  setResult: (result: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ setResult }: ScannerProps) => {
  const { ref } = useZxing({
    onResult(scannedResult) {
      setResult(scannedResult.getText());
    },
  });

  return <video ref={ref} />;
};

export default Scanner;
