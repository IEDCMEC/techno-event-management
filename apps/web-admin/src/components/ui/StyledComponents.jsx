import { forwardRef, Box, Text } from '@chakra-ui/react';
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
    '14Regular.grey': {
      color: 'rgba(4, 5, 11, 0.4)',
      fontFamily: inter.style.fontFamily,
      fontSize: '14px',
      // fontWeight: '400',
      lineHeight: '20px',
      letterSpacing: '0%',
      textAlign: 'center',
    },
    '14Regular.black': {
      /* 16 Regular */
      color: 'rgb(4, 5, 11)',
      fontFamily: inter.style.fontFamily,
      fontSize: '14px',
      // fontWeight: '400',
      lineHeight: '20px',
      letterSpacing: '0%',
      textAlign: 'left',
    },
    '14Regular.black.highlighted': {
      borderRadius: '8px',
      background: 'rgba(4, 5, 11, 0.1);',
      fontFamily: inter.style.fontFamily,
      fontSize: '14px',
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
export { StyledBox, StyledText };
