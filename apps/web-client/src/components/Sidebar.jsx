import { useRouter } from 'next/router';
import Link from 'next/link';

import { Box, Text, Button, Flex } from '@chakra-ui/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { logoutService } from '@/services/authenticationService';

const Sidebar = ({ className }) => {
  const router = useRouter();
  const { organizationId } = router.query;

  const handleLogout = async () => {
    await logoutService();
    router.push('/login');
  };

  return (
    <Box padding={4}>
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
          <Link href="/settings">Settings</Link>
        </Text>
      </Box>
      <Box paddingY={4}>
        <Button onClick={handleLogout} width="100%">
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
