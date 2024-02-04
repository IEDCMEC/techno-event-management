import { useState, useEffect } from 'react';

import { useFetch } from '@/hooks/useFetch';

import {
  Button,
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Select,
} from '@chakra-ui/react';

import Scanner from '@/components/Scanner';

import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useToast } from '@chakra-ui/react';

export default function NewOrganization() {
  const { loading, get, post } = useFetch();
  const toast = useToast();

  const router = useRouter();

  const { orgId, eventId } = router.query;

  const [uninterruptedScanMode, setUninterruptedScanMode] = useState(true);
  const [scanResult, setScanResult] = useState('');

  useEffect(() => {
    if (scanResult) {
      handleSubmit();
    }
  }, [scanResult]);

  const handleSubmit = async () => {
    const { data, status } = await post(
      `/core/organizations/${orgId}/events/${eventId}/participants/check-in/${scanResult}`,
      {},
      {
        checkedInAt: new Date().toISOString(),
      },
    );
    if (status === 200) {
      if (uninterruptedScanMode) {
        console.log(data.participant.firstName, data, status);
        toast({
          title: data.participant.firstName + ' Checked In',
          description: 'Participant checked out successfully.',
          status: 'success',
          duration: 3000, // Duration of the toast
          isClosable: true,
          position: 'top-right',
        });

        // setScanResult('');
      } else {
        router.push(`/organizations/${orgId}/events/${eventId}/participants/${scanResult}`);
      }
    } else {
      toast({
        title: data.error,
        description: 'Something went wrong',
        status: 'error',
        duration: 3000, // Duration of the toast
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap={8}
      >
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold">
            Check In Participant
          </Text>
        </Box>
        <Card width="100%" maxWidth="400px" height="auto">
          <CardBody width="full">
            <Scanner result={scanResult} setResult={setScanResult} />
            <Text>{JSON.stringify(scanResult)}</Text>
          </CardBody>
        </Card>
      </Flex>
    </DashboardLayout>
  );
}
