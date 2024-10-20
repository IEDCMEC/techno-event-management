import React from 'react';
import { Box, Heading, Text, Center } from '@chakra-ui/react';

const Registered: React.FC = () => {

  return (
    <Center height="100vh" flexDirection="column" bg="gray.100">
      <Box textAlign="center" p={6} borderRadius="md" boxShadow="lg" bg="white">
        <Heading as="h1" size="2xl" mb={4} color="green.500">
          Sucessfully Registered
        </Heading>
        <Text fontSize="lg" mb={4}>
         Your registration have been completed
        </Text>
      </Box>
    </Center>
  );
};

export default Registered;
