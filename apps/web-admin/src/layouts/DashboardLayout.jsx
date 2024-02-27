import { useRouter } from 'next/router';
import { useState } from 'react';

import { Box, useMediaQuery, Flex, Text } from '@chakra-ui/react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';

import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  previousPage,
  pageTitle,
  headerButton,
  children,
  debugInfo,
}) {
  const router = useRouter();

  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isSidebarOpen, setSidebarOpen] = useState(isMobile);

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
              {pageTitle}
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
                  onClick={() => {
                    router.push(previousPage);
                  }}
                />
                <Text fontSize="4xl" fontWeight="bold">
                  {pageTitle}
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
            </Flex>
          </Flex>
          <Box height="100%" overflowY="hidden" p={4}>
            {children}
          </Box>
        </Flex>
      </Flex>
      {!isMobile && (
        <Box fontSize="xs" maxHeight={4} overflow="hidden">
          {JSON.stringify(debugInfo)}
        </Box>
      )}
    </Flex>
  );
}
