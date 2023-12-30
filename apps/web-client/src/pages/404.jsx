import { Flex, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function P404() {
  return (
    <Flex
      height="100vh"
      width="100vw"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="9xl" fontWeight="bold">
        404
      </Text>

      <Button>
        <Link href="/">Back home</Link>
      </Button>
    </Flex>
  );
}
