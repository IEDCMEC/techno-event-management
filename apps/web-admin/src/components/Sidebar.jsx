import { useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MyLogo from '@/utils/logo';
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
import SidebarCalendar from './SidebarCalendar';
import { PiCertificate } from 'react-icons/pi';
import { MdOutlineEmail } from 'react-icons/md';
import { MdOutlineSettings } from 'react-icons/md';
import { Router, useRouter } from 'next/router';
import { RiTeamFill } from 'react-icons/ri';
import EventsDisplay from './EventsDisplay';
import { account } from '../contexts/MyContext';
import { StyledBox } from './ui/StyledComponents';
import { logo, logo_text } from './landing/assets';
import { useBreakpointValue } from '@chakra-ui/icons';
import Image from 'next/image';
const Sidebar = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth0();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { accountDetails } = useContext(account);
  const isAdmin = accountDetails.role === 'ADMIN';
  // const isUser = accountDetails.role === 'USER';
  const logoSrc = useBreakpointValue({
    base: logo,
    md: logo_text,
  });
  const router = useRouter();
  const orgId = accountDetails.orgId;

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
        <StyledBox width={'212px'} height="100%">
          <StyledBox height={'68px'} sx={{ display: 'flex', padding: '15px' }}>
            {/* <Text fontSize="4xl" fontWeight="bold">
              Event Sync
            </Text> */}
            <MyLogo />
            {/* <Image src={logoSrc} alt="EVENTSYNC" /> */}
          </StyledBox>

          <EventsDisplay />
          <SidebarContents />

          <Box flex="1"></Box>
          <SidebarCalendar scale={1.05} />
          {isAdmin && (
            <Button
              onClick={() => {
                router.push(`/${orgId}/settings`);
              }}
              isLoading={loading}
              width="100%"
            >
              Organization Settings
            </Button>
          )}

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
        </StyledBox>
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <EventsDisplay />
                    <SidebarContents />
                    <Box flex="1"></Box>
                    <SidebarCalendar scale={1.1} />
                    {isAdmin && (
                      <Button
                        onClick={() => {
                          router.push(`/${orgId}/settings`);
                        }}
                        isLoading={loading}
                        width="100%"
                        margin="20px 0px 10px 0px"
                      >
                        Organization Settings
                      </Button>
                    )}

                    <Button
                      onClick={handleLogout}
                      isLoading={loading}
                      loadingText="Please Wait"
                      width="100%"
                    >
                      Logout
                    </Button>
                  </div>
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
  const router = useRouter();

  const { accountDetails } = useContext(account);
  const isUser = accountDetails.role === 'USER';
  const orgId = accountDetails.orgId;

  const sidebarItems = [
    // { label: 'Events', path: `/${orgId}/events`, icon: <MdOutlineEvent /> },
    { label: 'Members', path: `/${orgId}/members`, icon: <RiTeamFill /> },
    { label: 'My Certificates', path: `/${orgId}/mycertificates`, icon: <PiCertificate /> },
    { label: 'Email Settings', path: `/${orgId}/emailsettings`, icon: <MdOutlineEmail /> },
    ...(isUser ? [{ label: 'Settings', path: `/settings`, icon: <MdOutlineSettings /> }] : []),
    // ...(isAdmin ? [{label:'Organizaion Settings',path:'/${orgId}/settings',icon}]: []),
  ];

  return (
    <>
      <Box>
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
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Box mr={2}>{item.icon}</Box>
            <Text fontSize="lg">{item.label}</Text>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Sidebar;
