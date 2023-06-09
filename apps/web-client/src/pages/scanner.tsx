import Navbar from '@/Components/Navbar';
import Scanner from '@/Components/Scanner';
import { Button, Flex, color } from '@chakra-ui/react';
import React, { useState } from 'react';

type Props = {};

const ScannerComponent: React.FC<Props> = () => {
  const [participant, setParticipant] = useState<string>('');

  return (
  <>
    <Navbar/>
    <Flex align={'center'} direction={'column'} gap={4} justify={'center'} h={'100vh'} w={'100vw'}>
      <Scanner setResult={(result: string) => setParticipant(result)} />
      <p style={{ color: 'black' }}>{participant}</p>
      <Button
        onClick={() => {
          console.log(participant);
        }}>Checkin</Button>
    </Flex></>
  );
};

export default ScannerComponent;
