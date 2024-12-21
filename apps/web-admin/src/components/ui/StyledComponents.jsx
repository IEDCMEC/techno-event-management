import { forwardRef, Box, Text, IconButton, Tooltip } from '@chakra-ui/react';
import { FaLinkedin, FaInstagramSquare } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { inter } from './fonts';
const StyledBox = forwardRef(({ children, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      bg={'rgb(251, 251, 254)'}
      {...props}
    >
      {children}
    </Box>
  );
});

const StyledText = forwardRef(({ children, variant, ...props }, ref) => {
  const styles = {
    /* 16 Regular */
    '16Regular.grey': {
      color: 'rgba(4, 5, 11, 0.4)',
      fontFamily: inter.style.fontFamily,
      fontSize: '16px',
      // fontWeight: '400',
      lineHeight: '20px',
      letterSpacing: '0%',
      textAlign: 'center',
    },
    '16Regular.black': {
      /* 16 Regular */
      color: 'rgb(4, 5, 11)',
      fontFamily: inter.style.fontFamily,
      fontSize: '16px',
      // fontWeight: '400',
      lineHeight: '20px',
      letterSpacing: '0%',
      textAlign: 'left',
    },
    '16Regular.black.highlighted': {
      borderRadius: '8px',
      background: 'rgba(4, 5, 11, 0.1);',
      fontFamily: inter.style.fontFamily,
      fontSize: '16px',
      // fontWeight: '400',
      lineHeight: '20px',
      letterSpacing: '0%',
      textAlign: 'left',
    },
  };
  return (
    <Text
      ref={ref}
      position={'relative'}
      {...props}
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      sx={styles[variant]}
      // apply default styling here inline
      // don't define the sx prop here, let it be there for overriding
      // use chakra ui inline styles for most purposes
    >
      {children}
    </Text>
  );
});

const StyledIconButton = forwardRef(({ children, iconD, ...props }, ref) => {
  const list = {
    l: <FaLinkedin />,
    t: <FaXTwitter />,
    i: <FaInstagramSquare />,
  };
  return (
    <IconButton
      ref={ref}
      icon={list[iconD]}
      color="#11185A"
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
  const list = {
    l: <FaLinkedin />,
    t: <FaXTwitter />,
    i: <FaInstagramSquare />,
  };
  return (
    <Tooltip label="Link not Provided">
      <IconButton
        ref={ref}
        icon={list[iconD]}
        color="#11185A"
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

export { StyledBox, StyledText, StyledIconButton, StyledDisabledIconButton };
