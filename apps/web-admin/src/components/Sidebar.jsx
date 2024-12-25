import { useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import DarkEventSync from '@/assets/Dark.png';
import LightEventSync from '@/assets/Light.png';
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
import { useColorMode } from '@chakra-ui/icons';
const Sidebar = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth0();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { accountDetails, allAccounts, setAccountDetails, userDetails } = useContext(account);
  const isAdmin = accountDetails && accountDetails.role ? accountDetails.role === 'ADMIN' : '';
  // const isUser = accountDetails.role === 'USER';
  const logoSrc = useBreakpointValue({
    base: logo,
    md: logo_text,
  });
  const router = useRouter();
  const orgId = accountDetails && accountDetails.orgId ? accountDetails.orgId : '';

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
  const configItems =
    orgId.length !== 0
      ? [
          ...(isAdmin
            ? [
                {
                  name: 'Settings',
                  path: `/${accountDetails.orgId}/settings`,
                  icon: <IoSettingsOutline />,
                },
              ]
            : []),
          // { name: 'Settings', icon: <IoSettingsOutline />, path: `/${accountDetails.orgId}/settings` },
          {
            name: 'Help',
            icon: <IoIosInformationCircleOutline />,
            path: `/${accountDetails.orgId}/profile`,
          },
        ]
      : [];

  const [myOrganizations, setMyOrganizations] = useState(
    allAccounts.map((value) => ({
      name: value.name,
      path: `/${value.orgId}/events`,
      status: true,
      data: value,
    })),
  );

  useEffect(() => {
    setMyOrganizations(
      allAccounts.map((value) => ({
        name: value.name,
        path: `/${value.orgId}/events`,
        status: true,
        data: value,
      })),
    );
  }, [allAccounts]);
  // const myOrganizations = ;
  const { colorMode } = useColorMode();
  return (
    <>
      {!isMobile ? (
        <StyledBox
          width={'250px'}
          height="100%"
          borderRight={
            colorMode === 'light'
              ? '1px solid rgba(4, 5, 11, 0.1)'
              : '1px solid rgba(251, 251, 254, 0.10)'
          }
        >
          <StyledBox
            height={'68px'}
            sx={{
              display: 'flex',
              padding: '10px',
              borderBottom:
                colorMode === 'light'
                  ? '1px solid rgba(4, 5, 11, 0.1)'
                  : '1px solid rgba(251, 251, 254, 0.10)',
            }}
            width="95%"
          >
            {/* <Text fontSize="4xl" fontWeight="bold">
              Event Sync
            </Text> */}
            {/* <MyLogo /> */}
            <Image
              src={colorMode === 'light' ? LightEventSync : DarkEventSync}
              alt="EVENTSYNC"
              height={'44px'}
              width="344px"
            />
          </StyledBox>
          <StyledBox
            sx={{
              height: 'calc(100vh - 68px)',
              borderBottom: '1px solid rgba(4, 5, 11, 0.1)',
              // borderRight: '1px solid rgba(4, 5, 11, 0.1)',
              padding: '20px 16px 0px 16px',
            }}
            width="95%"
          >
            {/* Starred Items */}
            <StyledBox
              sx={{ height: `${75 + myOrganizations.length * 22}px`, width: '100%' }}
              pt="10px"
              alignItems="flex-start"
              justifyContent="space-around"
            >
              <StyledText variant="16Regular.grey" gap={4} margin={'8px 0'} fontWeight="600">
                Organizations
              </StyledText>
              {accountDetails &&
                accountDetails.orgId &&
                myOrganizations.map((value, index) => (
                  <StyledText
                    key={index}
                    // variant=""
                    borderRadius="8px"
                    width="95%"
                    cursor="pointer"
                    p="4px 8px 4px 0px"
                    variant={
                      accountDetails.name !== value.name
                        ? '16Regular.black'
                        : '16Regular.black.highlighted'
                    }
                    sx={{
                      borderRadius: '8px',
                    }}
                    pl="15px"
                    ml="5px"
                    onClick={() => {
                      router.push(value.path);
                      setAccountDetails(value.data);
                    }}
                  >
                    {accountDetails.name === value.name && (
                      <Image
                        src={Rectangle}
                        alt=""
                        style={{ zIndex: '100', position: 'absolute', top: '6px', left: '0' }}
                      />
                    )}
                    {/* <StyledBox
                    h="5px"
                    w="5px"
                    bg={value.status ? '#2DD811' : '#E7431F'}
                    borderRadius="100%"
                    as="span"
                    mr="10px"
                  /> */}
                    {value.name}
                  </StyledText>
                ))}
            </StyledBox>

            <SidebarContents />
            {/* <EventsDisplay /> */}
            <StyledBox
              sx={{ height: `${configItems.length * 52}px`, width: '100%' }}
              pt="10px"
              alignItems="flex-start"
              justifyContent="space-around"
            >
              <StyledText variant="16Regular.grey" gap={8} margin={'8px 0'} fontWeight="600">
                Config
              </StyledText>
              {accountDetails &&
                accountDetails.orgId &&
                configItems.map((value, index) => (
                  <StyledText
                    flexDirection={'row'}
                    ml="5px"
                    cursor="pointer"
                    key={index}
                    width="95%"
                    position="relative"
                    justifyContent="flex-start"
                    variant={
                      router.asPath === value.path
                        ? '16Regular.black.highlighted'
                        : '16Regular.black'
                    }
                    p="4px 8px 4px 0px"
                    gap="2"
                    height="28px"
                    sx={{
                      borderRadius: '8px',
                    }}
                    onClick={() => {
                      router.push(value.path);
                    }}
                  >
                    {router.asPath === value.path && (
                      <Image
                        src={Rectangle}
                        alt=""
                        style={{ zIndex: '100', position: 'absolute', top: '6px', left: '0' }}
                      />
                    )}
                    <Box ml={4} as="span">
                      {value.icon}
                    </Box>
                    {value.name}
                  </StyledText>
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
                // borderRight: '1px solid rgba(4, 5, 11, 0.1)',
                borderTop: '1px solid rgba(4, 5, 11, 0.1)',
                width: '240px',
              }}
            >
              <Button
                onClick={handleLogout}
                isLoading={loading}
                variant={'outline'}
                loadingText="Please Wait"
                width="100%"
                bg={'#AFB4E9'}
                color={'black'}
              >
                Logout
              </Button>
            </StyledBox>
          </StyledBox>
        </StyledBox>
      ) : (
        <>
          <Drawer isOpen={isOpen} onClose={onClose} placement="left">
            <DrawerOverlay
              sx={{
                background:
                  'linear-gradient(147deg, rgba(130, 126, 126, 0.08) 2.41%, rgba(218, 218, 218, 0.08) 46.47%, rgba(148, 142, 142, 0.08) 87.35%);',
                // filter: 'blur(1.5px)',
              }}
            >
              <DrawerContent
              // bg={colorMode === 'light' ? 'rgba(4, 5, 11, 0.1)' : 'rgba(251, 251, 254, 0.10)'}
              >
                <DrawerCloseButton />
                <DrawerHeader bg={colorMode === 'light' ? 'rgb(251, 251, 254)' : '#04050B'}>
                  <StyledBox
                    height={'68px'}
                    sx={{
                      display: 'flex',
                      padding: '10px',
                      // borderBottom: '1px solid rgba(4, 5, 11, 0.1)',
                      // borderRight: '1px solid rgba(4, 5, 11, 0.1)',
                    }}
                    width="95%"
                  >
                    {/* <Text fontSize="4xl" fontWeight="bold">
              Event Sync
            </Text> */}
                    {/* <MyLogo /> */}
                    <Image
                      src={colorMode === 'light' ? LightEventSync : DarkEventSync}
                      alt="EVENTSYNC"
                      height={'44px'}
                      width="344px"
                    />
                  </StyledBox>
                </DrawerHeader>
                <DrawerBody
                  sx={{
                    height: 'calc(100vh - 68px)',
                    // borderBottom: '1px solid rgba(4, 5, 11, 0.1)',
                    // borderRight: '1px solid rgba(4, 5, 11, 0.1)',
                    // padding: '0px 16px 0px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                  }}
                  width="100%"
                  bg={colorMode === 'light' ? 'rgb(251, 251, 254)' : '#04050B'}
                >
                  {/* Starred Items */}
                  <StyledBox
                    sx={{ height: `${75 + myOrganizations.length * 22}px`, width: '100%' }}
                    pt="10px"
                    alignItems="flex-start"
                    justifyContent="space-around"
                  >
                    <StyledText variant="16Regular.grey" gap={4} margin={'8px 0'} fontWeight="600">
                      Organizations
                    </StyledText>
                    {accountDetails &&
                      accountDetails.orgId &&
                      myOrganizations.map((value, index) => (
                        <StyledText
                          key={index}
                          // variant=""
                          borderRadius="8px"
                          width="95%"
                          cursor="pointer"
                          p="4px 8px 4px 0px"
                          variant={
                            accountDetails.name !== value.name
                              ? '16Regular.black'
                              : '16Regular.black.highlighted'
                          }
                          sx={{
                            borderRadius: '8px',
                          }}
                          pl="15px"
                          ml="5px"
                          onClick={() => {
                            router.push(value.path);
                            setAccountDetails(value.data);
                          }}
                        >
                          {accountDetails.name === value.name && (
                            <Image
                              src={Rectangle}
                              alt=""
                              style={{ zIndex: '100', position: 'absolute', top: '6px', left: '0' }}
                            />
                          )}
                          {/* <StyledBox
                    h="5px"
                    w="5px"
                    bg={value.status ? '#2DD811' : '#E7431F'}
                    borderRadius="100%"
                    as="span"
                    mr="10px"
                  /> */}
                          {value.name}
                        </StyledText>
                      ))}
                  </StyledBox>

                  <SidebarContents />
                  {/* <EventsDisplay /> */}
                  <StyledBox
                    sx={{ height: `${configItems.length * 52}px`, width: '100%' }}
                    pt="10px"
                    alignItems="flex-start"
                    justifyContent="space-around"
                  >
                    <StyledText variant="16Regular.grey" gap={8} margin={'8px 0'} fontWeight="600">
                      Config
                    </StyledText>
                    {accountDetails &&
                      accountDetails.orgId &&
                      configItems.map((value, index) => (
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
                      // borderRight: '1px solid rgba(4, 5, 11, 0.1)',
                      // borderTop: '1px solid rgba(4, 5, 11, 0.1)',
                      width: '100%',
                    }}
                  >
                    <Button
                      onClick={handleLogout}
                      isLoading={loading}
                      loadingText="Please Wait"
                      width="100%"
                      bg={'#AFB4E9'}
                      color={'#black'}
                    >
                      Logout
                    </Button>
                  </StyledBox>
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
  // const isUser = accountDetails.role === 'USER';
  const orgId = accountDetails && accountDetails.orgId ? accountDetails.orgId : undefined;
  const { colorMode } = useColorMode();
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
        sx={{ height: `${sidebarItems.length * 42}px`, width: '100%' }}
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
              background:
                router.asPath === value.path
                  ? colorMode === 'light'
                    ? 'rgba(4, 5, 11, 0.1)'
                    : 'rgba(251, 251, 254, 0.10)'
                  : '',
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
