import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import DashboardLayout from '@/layouts/DashboardLayout';

export default function Event() {
  const router = useRouter();

  const { orgId, eventId } = router.query;

  // useEffect(() => {
  //   router.push(`/organizations/${orgId}/events/${eventId}/participants`);
  // }, [orgId, eventId]);
  const iconStyle = {
    fontSize: '45px', // Adjust the size as needed
    marginTop: '8px',
  };
  const buttonStyle = {
    marginRight: '50px',
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
        <Box width="100%" p={8} display="flex" justifyContent="flex-start">
          <button
            style={buttonStyle}
            onClick={() => router.push(`/organizations/${orgId}/events/`)}
          >
            <BsArrowLeft style={iconStyle} />
          </button>
          <Text fontSize="4xl" fontWeight="bold">
            {eventId}
          </Text>
        </Box>
        <Flex width="100%" height="100%" gap={4}>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/events/${eventId}/participants`);
            }}
          >
            Participants
          </Button>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/events/${eventId}/attributes`);
            }}
          >
            Attributes
          </Button>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/events/${eventId}/participants/check-in`);
            }}
          >
            Check-in
          </Button>
        </Flex>
      </Flex>
    </DashboardLayout>
  );
}
