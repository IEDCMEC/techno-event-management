import Scanner from '@/Components/Scanner';
import { color } from '@chakra-ui/react';
import React, { useState } from 'react';

type Props = {};

const ScannerComponent: React.FC<Props> = () => {
  const [participant, setParticipant] = useState<string>('');

  return (
    <div>
      <Scanner setResult={(result: string) => setParticipant(result)} />
      <p style={{ color: 'black' }}>hello{participant}</p>
    </div>
  );
};

export default ScannerComponent;
