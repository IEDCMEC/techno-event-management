import { forwardRef, Box, Text, IconButton, Tooltip, Button } from '@chakra-ui/react';
import { FaLinkedin, FaInstagramSquare } from 'react-icons/fa';
import { HiGlobeAlt } from 'react-icons/hi2';
import { FaXTwitter } from 'react-icons/fa6';
import { inter } from './fonts';
import { useColorMode, Td } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';

const StyledBox = forwardRef(({ children, ...props }, ref) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      ref={ref}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      bg={colorMode === 'light' ? 'rgb(251, 251, 254)' : '#04050B'}
      {...props}
    >
      {children}
    </Box>
  );
});

const StyledText = forwardRef(({ children, color, variant, ...props }, ref) => {
  const { colorMode } = useColorMode(); // No need for toggleColorMode here
  const styles = {
    '16Regular.grey': {
      color: colorMode === 'light' ? 'rgba(4, 5, 11, 0.4)' : 'rgba(251, 251, 254, 0.40)',
      fontFamily: inter.style.fontFamily,
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '0%',
      textAlign: 'center',
    },
    '16Regular.black': {
      color: colorMode === 'light' ? '#04050B' : 'white',
      fontFamily: inter.style.fontFamily,
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '0%',
      textAlign: 'left',
    },
    '16Regular.black.highlighted': {
      borderRadius: '8px',
      background: colorMode === 'light' ? 'rgba(4, 5, 11, 0.1)' : 'rgba(251, 251, 254, 0.10)',
      fontFamily: inter.style.fontFamily,
      fontSize: '16px',
      lineHeight: '20px',
      color: colorMode === 'light' ? '#04050B' : 'white',
      letterSpacing: '0%',
      textAlign: 'left',
    },
  };

  // Compute styles dynamically based on variant and colorMode
  const computedStyles = styles[variant || '16Regular.black'];

  return (
    <Text
      ref={ref}
      position={'relative'}
      {...props}
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      sx={computedStyles} // Apply dynamically computed styles
    >
      {children}
    </Text>
  );
});
const StyledTd = forwardRef(({ children, color, variant, ...props }, ref) => {
  const { colorMode } = useColorMode(); // No need for toggleColorMode here
  const styles = {
    '16Regular.grey': {
      color: colorMode === 'light' ? 'rgba(4, 5, 11, 0.4)' : 'rgba(251, 251, 254, 0.40)',
      fontFamily: inter.style.fontFamily,
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '0%',
      textAlign: 'center',
    },
    '16Regular.black': {
      color: colorMode === 'light' ? '#04050B' : 'white',
      fontFamily: inter.style.fontFamily,
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '0%',
      textAlign: 'left',
    },
    '16Regular.black.highlighted': {
      borderRadius: '8px',
      backgroundColor: colorMode === 'light' ? 'rgba(4, 5, 11, 0.1)' : 'rgba(251, 251, 254, 0.10)',
      fontFamily: inter.style.fontFamily,
      fontSize: '16px',
      lineHeight: '20px',
      color: colorMode === 'light' ? '#04050B' : 'white',
      letterSpacing: '0%',
      textAlign: 'left',
    },
  };

  // Compute styles dynamically based on variant and colorMode
  const computedStyles = styles[variant || '16Regular.black'];
  return (
    <Td
      ref={ref}
      sx={computedStyles}
      borderBottomColor={colorMode === 'dark' ? '#04050B' : 'white'}
    >
      {children}
    </Td>
  );
});

const StyledIconButton = forwardRef(({ children, iconD, ...props }, ref) => {
  const { colorMode } = useColorMode();
  const iconColor = colorMode === 'light' ? 'black' : 'white';
  const list = {
    w: <HiGlobeAlt />,
    l: <FaLinkedin />,
    t: <FaXTwitter />,
    i: <FaInstagramSquare />,
  };
  return (
    <IconButton
      ref={ref}
      icon={list[iconD]}
      color={iconColor}
      boxSize={['20px', '26px', '32px']} // Responsive size based on screen width
      fontSize={['20px', '22px', '28px']}
      variant="ghost"
      {...props}
    >
      {children}
    </IconButton>
  );
});
const StyledDisabledIconButton = forwardRef(({ children, iconD, ...props }, ref) => {
  const { colorMode } = useColorMode();
  const iconColor = colorMode === 'light' ? 'black' : 'white';
  const list = {
    w: <HiGlobeAlt />,
    l: <FaLinkedin />,
    t: <FaXTwitter />,
    i: <FaInstagramSquare />,
  };
  return (
    <Tooltip label="Link not Provided">
      <IconButton
        ref={ref}
        icon={list[iconD]}
        color={iconColor}
        boxSize={['20px', '26px', '32px']} // Responsive size based on screen width
        fontSize={['20px', '22px', '28px']}
        variant="ghost"
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        {...props}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
});

const StyledButton = forwardRef(({ children, ...props }, ref) => {
  const { colorMode } = useColorMode();
  return (
    <Button
      ref={ref}
      display="flex"
      padding="8px 12px"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      gap="8px"
      fontWeight="400"
      flexWrap="wrap"
      borderRadius="var(--8, 8px)"
      border={
        colorMode === 'light'
          ? '1px solid var(--black-10, rgba(4, 5, 11, 0.10))'
          : '1px solid var(--white-10, rgba(251, 251, 254, 0.10))'
      }
      background={
        colorMode === 'light'
          ? 'var(--black-4, rgba(4, 5, 11, 0.04))'
          : 'var(--white-5, rgba(251, 251, 254, 0.05))'
      }
      {...props}
    >
      {children}
    </Button>
  );
});

export {
  StyledBox,
  StyledText,
  StyledTd,
  StyledIconButton,
  StyledDisabledIconButton,
  StyledButton,
};
