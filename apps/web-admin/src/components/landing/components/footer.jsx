import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { FaXTwitter, FaGithub, FaLinkedin } from 'react-icons/fa6';

const Footer = () => {
  return (
    <Box
      position={'absolute'}
      px={{ base: 8 }}
      bottom={'0'}
      width={'full'}
      bg={'brand.nav_white'}
      backdropFilter="blur(6px)"
      py={'10px'}
      display={'inline-flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flex
        minH={'40px'}
        display={'inline-flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        maxW={'1320px'}
        width={'1320px'}
        gap={{ base: '10px', md: '14px' }}
        direction={{ base: 'column-reverse', md: 'row' }}
        my={{ base: '12px', md: '0px' }}
      >
        <Text
          fontSize={{ base: '14px', md: '15px' }}
          fontWeight={500}
          fontStyle={'normal'}
          color={'brand.black_v2'}
          wordBreak={'break-word'}
          lineHeight={'22px'}
          textAlign={'center'}
        >
          Copyright © 2024 EventSync. Engineered by{' '}
          <Text as="span" fontWeight={600}>
            IEDC
          </Text>{' '}
          MEC.
        </Text>
        <Flex
          display={'inline-flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={'8px'}
          sx={{
            transform: { base: 'scale(0.9)', md: 'scale(1)' },
            transformOrigin: 'center',
          }}
        >
          <Button variant="socials" py={'10.8px'} px={'9.8px'} backdropFilter="blur(6px)">
            <FaXTwitter style={{ width: '19px', height: '19px' }} />
          </Button>
          <Button variant="socials" py={'10.8px'} px={'9.8px'} backdropFilter="blur(6px)">
            <FaGithub style={{ width: '19px', height: '19px' }} />
          </Button>
          <Button variant="socials" py={'10.8px'} px={'9.8px'} backdropFilter="blur(6px)">
            <FaLinkedin style={{ width: '19px', height: '19px' }} />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
