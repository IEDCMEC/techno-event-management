import { useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MyLogo from '@/utils/logo';
import { MdOutlineEvent } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
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
import { StyledBox, StyledText } from './ui/StyledComponents';
import { logo, logo_text } from './landing/assets';
import { useBreakpointValue } from '@chakra-ui/icons';
import Image from 'next/image';
import Rectangle from '@/utils/Rectangle 1.svg';
import { IoIosInformationCircleOutline } from 'react-icons/io';

const Sidebar = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth0();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { accountDetails, allAccounts, setAccountDetails } = useContext(account);
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
  const starredItems = [
    { name: 'Technopreneur `24', status: true },
    { name: 'Excel `24', status: false },
  ];
  const configItems = [
    ...(isAdmin ? [{ name: 'Settings', path: `/${accountDetails.orgId}/settings`, icon: <IoSettingsOutline /> }] : []),
    // { name: 'Settings', icon: <IoSettingsOutline />, path: `/${accountDetails.orgId}/settings` },
    {
      name: 'Help',
      icon: <IoIosInformationCircleOutline />,
      path: `/${accountDetails.orgId}/profile`,
    },
  ];
  const myOrganizations = allAccounts.map((value) => ({
    name: value.name,
    path: `/${value.orgId}/events`,
    status: true,
    data: value
  }));
  return (
    <>
      {!isMobile ? (
        <StyledBox width={'250px'} height="100%">
          <StyledBox
            height={'68px'}
            sx={{
              display: 'flex',
              padding: '10px',
              borderBottom: '1px solid rgba(4, 5, 11, 0.1)',
              borderRight: '1px solid rgba(4, 5, 11, 0.1)',
            }}
            width="95%"
          >
            {/* <Text fontSize="4xl" fontWeight="bold">
              Event Sync
            </Text> */}
            {/* <MyLogo /> */}
            <Image src={logoSrc} alt="EVENTSYNC" height={'44px'} width="344px" />
          </StyledBox>
          <StyledBox
            sx={{
              height: 'calc(100vh - 68px)',
              borderBottom: '1px solid rgba(4, 5, 11, 0.1)',
              borderRight: '1px solid rgba(4, 5, 11, 0.1)',
              padding: '20px 16px 0px 16px',
            }}
            width="95%"
          >
            {/* Starred Items */}
            <StyledBox
              sx={{ height: '114px', width: '100%' }}
              pt="10px"
              alignItems="flex-start"
              justifyContent="space-around"
            >
              <StyledText variant="16Regular.grey" gap={8} margin={'8px 0'} fontWeight="600">
                Organizations
              </StyledText>
              {myOrganizations.map((value, index) => (
                <StyledText
                  key={index}
                  pl="10px"
                  variant="16Regular.black"
                  cursor="pointer"
                  onClick={() => {
                    router.push(value.path)
                    setAccountDetails(value.data)
                  }}
                >
                  <StyledBox
                    h="5px"
                    w="5px"
                    bg={value.status ? '#2DD811' : '#E7431F'}
                    borderRadius="100%"
                    as="span"
                    mr="10px"
                  />
                  {value.name}
                </StyledText>
              ))}
            </StyledBox>

            <SidebarContents />
            {/* <EventsDisplay /> */}
            <StyledBox
              sx={{ height: `${configItems.length * 50}px`, width: '100%' }}
              pt="10px"
              alignItems="flex-start"
              justifyContent="space-around"
            >
              <StyledText variant="16Regular.grey" gap={8} margin={'8px 0'} fontWeight="600">
                Config
              </StyledText>
              {configItems.map((value, index) => (
                <StyledBox
                  flexDirection={'row'}
                  ml="5px"
                  cursor="pointer"
                  key={index}
                  width="95%"
                  position="relative"
                  justifyContent="flex-start"
                  p="4px 8px 4px 0px"
                  gap="2"
                  height="28px"
                  sx={{
                    background: router.asPath === value.path ? 'rgba(4, 5, 11, 0.1)' : '',
                    borderRadius: '8px',
                  }}
                >
                  {router.asPath === value.path && (
                    <Image
                      src={Rectangle}
                      alt=""
                      style={{ zIndex: '100', position: 'absolute', top: '6px', left: '0' }}
                    />
                  )}
                  <Box ml={4}>{value.icon}</Box>
                  <StyledText
                    key={index}
                    pl="0px"
                    variant="16Regular.black"
                    transition="outline 0.2s"
                    onClick={() => {
                      router.push(value.path);
                    }}
                  >
                    {value.name}
                  </StyledText>
                </StyledBox>
              ))}
            </StyledBox>

            <StyledBox flex="1"></StyledBox>
            <SidebarCalendar scale={0.95} />
            {/* {isAdmin && (
              <Button
                onClick={() => {
                  router.push(`/${orgId}/settings`);
                }}
                isLoading={loading}
                width="100%"
              >
                Settings
              </Button>
            )} */}

            <StyledBox
              paddingY={4}
              sx={{
                borderRight: '1px solid rgba(4, 5, 11, 0.1)',
                borderTop: '1px solid rgba(4, 5, 11, 0.1)',
                width: '240px',
              }}
            >
              <Button
                onClick={handleLogout}
                isLoading={loading}
                loadingText="Please Wait"
                width="100%"
                bg={'#11185A'}
                color={'#FFF'}
              >
                Logout
              </Button>
            </StyledBox>
          </StyledBox>
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

                    {/* <Button
                      onClick={handleLogout}
                      isLoading={loading}
                      loadingText="Please Wait"
                      width="100%"
                    >
                      Logout
                    </Button> */}
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
    { label: 'Events', path: `/${orgId}/events`, icon: <MdOutlineEvent /> },
    { label: 'Members', path: `/${orgId}/members`, icon: <RiTeamFill /> },
    { label: 'Certificates', path: `/${orgId}/mycertificates`, icon: <PiCertificate /> },
    { label: 'Emailer', path: `/${orgId}/emailer`, icon: <MdOutlineEmail /> },
    // ...(isUser ? [{ label: 'Settings', path: `/settings`, icon: <MdOutlineSettings /> }] : []),
    // ...(isAdmin ? [{label:'Organizaion Settings',path:'/${orgId}/settings',icon}]: []),
  ];

  return (
    <>
      {/* DashBoard Items */}

      <StyledBox
        sx={{ height: '170px', width: '100%' }}
        pt="10px"
        alignItems="flex-start"
        justifyContent="space-around"
      >
        <StyledText variant="16Regular.grey" gap={8} margin={'8px 0'} fontWeight="600">
          Tools
        </StyledText>
        {sidebarItems.map((value, index) => (
          <StyledBox
            flexDirection={'row'}
            ml="5px"
            cursor="pointer"
            key={index}
            width="95%"
            position="relative"
            justifyContent="flex-start"
            p="4px 8px 4px 0px"
            gap="4"
            height="28px"
            sx={{
              background: router.asPath === value.path ? 'rgba(4, 5, 11, 0.1)' : '',
              borderRadius: '8px',
            }}
          >
            {router.asPath === value.path && (
              <Image
                src={Rectangle}
                alt=""
                style={{ zIndex: '100', position: 'absolute', top: '6px', left: '0' }}
              />
            )}
            <Box ml={4}>{value.icon}</Box>
            <StyledText
              key={index}
              pl="0px"
              variant="16Regular.black"
              transition="outline 0.2s"
              onClick={() => {
                router.push(value.path);
              }}
            >
              {value.label}
            </StyledText>
          </StyledBox>
        ))}
      </StyledBox>
      <Box>
        {/* Map over the sidebarItems array to generate sidebar items */}
        {/* {sidebarItems.map((item, index) => (
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
        ))} */}
      </Box>
    </>
  );
};

export default Sidebar;
