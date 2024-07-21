import React from 'react';
import { Heading, Text, Button, Stack, Flex, background } from '@chakra-ui/react';
import { HiMiniArrowUpRight } from 'react-icons/hi2';

const CallToAction = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} flexDir={'column'}>
      <Button
        bg={'brand.black_v1'}
        color={'brand.white'}
        letterSpacing={'-0.1px'}
        lineHeight={'20.6px'}
        wordBreak={'break-word'}
        rounded={'11.5px'}
        fontSize={'15px'}
        textStyle={'normal'}
        fontWeight={'500'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        _hover={{
          opacity: '0.97',
        }}
        _active={{
          background: 'brand.black_v2',
        }}
        sx={{
          transform: { base: 'scale(0.9)', md: 'scale(1)' },
          transformOrigin: 'center',
        }}
      >
        <Text as="span" fontWeight={'600'}>
          New Update:
        </Text>
        &nbsp;&nbsp;AI Integration{' '}
        <HiMiniArrowUpRight style={{ width: '19.8px', height: '19.8px', marginLeft: '1px' }} />
      </Button>
      <Heading
        mt={'29.6px'}
        fontStyle={'normal'}
        fontSize={{ base: '56px', md: '87.5px' }}
        fontWeight={500}
        letterSpacing={'-3.6px'}
        color={'brand.black_v1'}
        maxWidth={'750px'}
        textAlign={'center'}
        lineHeight={{ md: '88.3px', base: '57px' }}
        wordBreak={'break-word'}
        mx={'10px'}
      >
        Simplified event <br /> planning awaits
      </Heading>
      <Text
        maxW={{ md: '560px', base: '430px' }}
        mt={{ md: '20.8px', base: '12px' }}
        mx={'10px'}
        textAlign={'center'}
        color={'brand.black_v1'}
        fontSize={{ base: '17px', md: '22px' }}
        // fontSize={{ md:'22px' }}
        fontWeight={500}
        lineHeight={'30.8px'}
        wordBreak={'break-word'}
        letterSpacing={'-0.3px'}
      >
        From concept to completion, manage every detail with ease. Transform your events and impress
        attendees.
      </Text>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        align="center"
        mt={'32px'}
        maxW={'400px'}
        width={'full'}
        px={{ base: '50px' }}
        display={'flex'}
        justifyContent={'center'}
      >
        <Button
          variant="black"
          lineHeight={'24px'}
          letterSpacing={'-0.2px'}
          wordBreak={'break-word'}
          width={{ base: 'full', md: '124px' }}
        >
          Start for free
        </Button>
        <Button
          variant="trans"
          backdropFilter="blur(6px)"
          lineHeight={'24px'}
          letterSpacing={'-0.2px'}
          wordBreak={'break-word'}
          // width={{ base: 'full' }}
          width={{ base: 'full', md: '124px' }}
        >
          Watch Demo
        </Button>
      </Stack>
    </Flex>
  );
};

export default CallToAction;
