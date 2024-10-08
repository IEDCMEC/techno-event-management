import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { Box, useMediaQuery, Flex, Text, Button, useDisclosure } from '@chakra-ui/react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import Sidebar from '@/components/Sidebar';
import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import { account } from '@/contexts/MyContext';
import OrganizationSettingsModal from './OrganizationSettingsModal';
// Adjust the import path as needed

export default function DashboardLayout({ headerButton, children }) {
  const router = useRouter();
  const { accountDetails, setAccountDetails } = useContext(account);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isSidebarOpen, setSidebarOpen] = useState(isMobile);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure hook for modal

  if (isAuthenticated) {
    return (
      <Flex height="100vh" flexDirection="column">
        <Flex height="100%" overflow="hidden" flexDirection={isMobile ? 'column' : 'row'}>
          {isMobile && (
            <Flex
              height={24}
              p={4}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="4xl" fontWeight="bold">
                {accountDetails?.name}
              </Text>
              <Flex
                height={10}
                width={10}
                justifyContent="center"
                alignItems="center"
                onClick={() => {
                  setSidebarOpen(true);
                }}
              >
                <RxHamburgerMenu fontSize={30} color="black" />
              </Flex>
            </Flex>
          )}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
          <Flex
            height="100%"
            width="100%"
            overflowY="hidden"
            flexDirection="column"
            transition="margin 0.3s ease"
          >
            <Flex
              height={isMobile ? 'auto' : 40}
              width="100%"
              p={4}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {!isMobile && (
                <Flex width="100%" alignItems="center" gap={10}>
                  <IoMdArrowRoundBack
                    size={30}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      router.back();
                    }}
                  />
                  <Image
                    src={user.picture}
                    alt="logo"
                    height={50}
                    width={50}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      router.push(`/${accountDetails?.orgId}`);
                    }}
                  />
                  <Text fontSize="4xl" fontWeight="bold">
                    {accountDetails?.name}
                  </Text>
                </Flex>
              )}
              <Flex
                height="100%"
                width="100%"
                justifyContent={isMobile ? 'space-evenly' : 'flex-end'}
                alignItems="center"
                gap={4}
              >
                {headerButton}
                <Button onClick={onOpen}>Organization Settings</Button> {/* Button to open modal */}
              </Flex>
            </Flex>
            <Box height="100%" overflowY="auto" overflowX={'auto'} p={4}>
              {children}
            </Box>
          </Flex>
        </Flex>
        <OrganizationSettingsModal isOpen={isOpen} onClose={onClose} />{' '}
        {/* Organization Settings modal */}
      </Flex>
    );
  } else {
    return <div>{children}</div>;
  }
}
