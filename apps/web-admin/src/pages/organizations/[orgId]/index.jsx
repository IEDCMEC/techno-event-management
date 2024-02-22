import { useRouter } from 'next/router';
import { BsArrowLeft } from 'react-icons/bs';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

export default function Organization() {
  const router = useRouter();

  const { orgId } = router.query;
  const iconStyle = {
    fontSize: '45px',
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
            onClick={() => router.push(`/organizations`)}
            marginRight="100px"
          >
            <BsArrowLeft style={iconStyle} />
          </button>
          <Text fontSize="4xl" fontWeight="bold">
            {orgId}
          </Text>
        </Box>
        <Flex width="100%" height="100%" gap={4}>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/events`);
            }}
          >
            Events
          </Button>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/members`);
            }}
          >
            Members
          </Button>
        </Flex>
      </Flex>
    </DashboardLayout>
  );
}
