import Scanner from '@/components/Scanner/Scanner';
import DashboardLayout from '@/layouts/DashboardLayout';

import { useState } from 'react';

import { Box, Text, Button, Flex } from '@chakra-ui/react';

export default function ScannerPage() {
  const [result, setResult] = useState('No result');
  return (
    <DashboardLayout>
      <Box backgroundColor="white" padding={4} borderRadius={8} width={'100vh'}>
        <Scanner result={result} setResult={setResult} />
      </Box>
    </DashboardLayout>
  );
}
