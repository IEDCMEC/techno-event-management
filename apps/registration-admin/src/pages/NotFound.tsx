import React from 'react';
import { Box, Heading, Text, Center } from '@chakra-ui/react';

const NotFound: React.FC = () => {
  return (
    <Center height="100vh" flexDirection="column" bg="gray.100">
      <Box textAlign="center" p={6} borderRadius="md" boxShadow="lg" bg="white">
        <Heading as="h1" size="2xl" mb={4} color="red.500">
          404
        </Heading>
        <Text fontSize="lg" mb={4}>
          Sorry, the page you are looking for does not exist.
        </Text>
      </Box>
    </Center>
  );
};

export default NotFound;
