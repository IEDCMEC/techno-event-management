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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';

import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { ManageAccountsTwoTone } from '@mui/icons-material';

const Sidebar = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth0();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const router = useRouter();

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
        <Box
          display={{ base: 'flex', md: 'block' }}
          padding={4}
          height="100%"
          width={80}
          backgroundColor="#F4F4F4"
          justifyContent="space-between"
          flexDirection="row"
        >
          <Box paddingY={4}>
            <Text fontSize="4xl" fontWeight="bold">
              techno
            </Text>
          </Box>
          <SideBarTree />
          <Box paddingY={4} width="100%" display="flex" justifyContent="space-evenly">
            <AccountLoggedIn />

            <Button
              onClick={handleLogout}
              isLoading={loading}
              loadingText="Please Wait"
              colorScheme="gray"
              variant="solid"
            >
              <LogoutIcon />
            </Button>

            <Button
              onClick={() => {
                router.push('/settings');
              }}
              isLoading={loading}
              loadingText="Please Wait"
              colorScheme="gray"
            >
              <ManageAccountsOutlinedIcon />
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
                  <SidebarContents />

                  <Box paddingY={4}>
                    <Button
                      onClick={handleLogout}
                      isLoading={loading}
                      loadingText="Please Wait"
                      //width="100%"
                    >
                      <LogoutIcon />
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
  // Define an array of sidebar items with labels and paths
  const sidebarItems = [
    { label: 'Organizations', path: '/organizations' },
    { label: 'Events', path: '/events' },
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

const SideBarTree = () => {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={() => {
          router.push('/organizations');
        }}
      >
        Organizations
      </Button>
    </div>
  );
};

const AccountLoggedIn = () => {
  // const [open,setOpen] = useState(false);

  //const handleClick = () =>{
  //setOpen(!open);
  //}
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button colorScheme="gray">
            <PermIdentityIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent maxWidth="50%" marginLeft="8px">
          <PopoverBody> You are logged in as: </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Sidebar;
