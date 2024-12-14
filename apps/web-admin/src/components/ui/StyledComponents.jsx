import { forwardRef, Box, Text } from '@chakra-ui/react';

const StyledBox = forwardRef(({ children, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      {...props}
    >
      {children}
    </Box>
  );
});

const StyledText = forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} {...props}
      // apply default styling here inline
      // don't define the sx prop here, let it be there for overriding
      // use chakra ui inline styles for most purposes
    >
      {children}
    </Text>
  );
});
export { StyledBox, StyledText };
