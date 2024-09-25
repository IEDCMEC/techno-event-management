'use-client';
import React from 'react';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import theme, { Fonts } from './theme';
import Navbar from './components/navbar';
import CallToAction from '@/components/landing/components/calltoaction';
import Image from 'next/image';
import { dash_frame } from '@/components/landing/assets';
import Footer from '@/components/landing/components/footer';

const Landing = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box minHeight="100vh">
        <Fonts />
        <Navbar />
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          flexDir={'column'}
          pb={'195px'}
          pt={{ md: '272px', base: '125px' }}
          gap={'70px'}
        >
          <CallToAction />
          <Flex mx={'10px'}>
            <Image src={dash_frame} style={{ width: '1236px' }} alt="Dashboard" />
          </Flex>
        </Flex>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};

export default Landing;
