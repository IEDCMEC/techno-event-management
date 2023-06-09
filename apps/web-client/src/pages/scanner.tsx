import Scanner from '@/Components/Scanner';
import { Flex, color } from '@chakra-ui/react';
import React, { useState } from 'react';

type Props = {};

const ScannerComponent: React.FC<Props> = () => {
  const [participant, setParticipant] = useState<string>('');

  return (
    <Flex align={'center'} direction={'column'} justify={'center'} h={'100vh'} w={'100vw'}>
     
      <Scanner setResult={(result: string) => setParticipant(result)} />
      <p style={{ color: 'black' }}>hello{participant}</p>
   
    </Flex>
  );
};

export default ScannerComponent;
