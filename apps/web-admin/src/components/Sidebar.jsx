import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Text,
  Button,
  Flex,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useMediaQuery,
} from '@chakra-ui/react';
import Link from 'next/link';
const Sidebar = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth0();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

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
    <>
      {/* Desktop Sidebar */}
      {!isMobile ? (
        <Box display={{ base: 'none', md: 'block' }} padding={4} height="100%" width={80}>
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
              <Link href="/events">Events</Link>
            </Text>
          </Flex>
          <Box paddingY={4}>
            <Text fontSize="xl">
              <a href="/settings">Settings</a>
            </Text>
          </Box>
          <Box paddingY={4}>
            <Button
              onClick={handleLogout}
              isLoading={loading}
              loadingText="Please Wait"
              width="100%"
            >
              Logout
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Drawer isOpen={isOpen} onClose={onClose} placement="left">
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                  <Text fontSize="2xl" fontWeight="bold">
                    techno
                  </Text>
                </DrawerHeader>
                <DrawerBody>
                  <Flex direction="column" gap={2}>
                    <Text fontSize="xl">
                      <Link href="/organizations">Organizations</Link>
                    </Text>
                    <Text fontSize="xl">
                      <Link href="/events">Events</Link>
                    </Text>
                  </Flex>
                  <Box paddingY={4}>
                    <Text fontSize="xl">
                      <a href="/settings">Settings</a>
                    </Text>
                  </Box>
                  <Box paddingY={4}>
                    <Button
                      onClick={handleLogout}
                      isLoading={loading}
                      loadingText="Please Wait"
                      width="100%"
                    >
                      Logout
                    </Button>
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      )}
    </>
  );
};

export default Sidebar;
