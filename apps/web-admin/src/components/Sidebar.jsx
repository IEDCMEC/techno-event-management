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
import { Router, useRouter } from 'next/router';

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
      {!isMobile ? (
        <Box padding={4} height="100%" minWidth={50} width={80}>
          <Box paddingY={4}>
            <Text fontSize="4xl" fontWeight="bold">
              Event Sync
            </Text>
          </Box>
          <SidebarContents />

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
                    Event Sync
                  </Text>
                </DrawerHeader>
                <DrawerBody>
                  <SidebarContents />

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

const SidebarContents = () => {
  const sidebarItems = [
    { label: 'Organizations', path: '/organizations' },
    { label: 'Settings', path: '/settings' },
  ];
  const router = useRouter();

  return (
    <>
      <Box paddingY={4}>
        {/* Map over the sidebarItems array to generate sidebar items */}
        {sidebarItems.map((item, index) => (
          <Box
            key={index}
            _hover={{ color: 'black.400', backgroundColor: 'gray.100', cursor: 'pointer' }}
            onClick={() => {
              router.push(item.path);
            }}
            transition="outline 0.2s"
            borderRadius="md"
            padding="2"
          >
            <Text fontSize="lg">{item.label}</Text>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Sidebar;
