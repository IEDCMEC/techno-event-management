import { useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth0 } from '@auth0/auth0-react';

import { Box, Text, Button, Flex } from '@chakra-ui/react';

const Sidebar = () => {
  const [loading, setLoading] = useState(false);

  const { logout } = useAuth0();

  const handleLogout = (e) => {
    e.preventDefault();
    setLoading(true);
    logout({
      logoutParams: {
        returnTo: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
      },
    });
  };

  return (
    <Box padding={4} height="100%" width={80}>
      <Box paddingY={4}>
        <Text fontSize="4xl" fontWeight="bold">
          techno
        </Text>
      </Box>
      <Flex paddingY={4} direction="column" gap={2}>
        <Text fontSize="xl">
          <Link href="/organizations">Organizations</Link>
        </Text>
        <Text fontSize="xl">
          <Link href="/organizations">Events</Link>
        </Text>
      </Flex>
      <Box paddingY={4}>
        <Text fontSize="xl">
          <a href="/settings">Settings</a>
        </Text>
      </Box>
      <Box paddingY={4}>
        <Button onClick={handleLogout} isLoading={loading} loadingText="Please Wait" width="100%">
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
