import React from 'react';
import {
  Card,

  CardBody,
  CardFooter,
  Stack,
  Image,
  Heading,
  Text,
  Divider,
 
  Button,
  StackDivider,
  Box,
  Flex,
} from '@chakra-ui/react';

type Props = {};

const ParticipantCard = (props: Props) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Flex align={'center'} direction={'column'} gap={4} justify={'center'}>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            width={200}
            height={200}
            alt="Green double couch with wooden legs"
            borderRadius="50%"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Allen Shibu</Heading>
          </Stack>
        </Flex>
      </CardBody>
      <Divider />
      <Stack divider={<StackDivider />} spacing="4">
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Checkedin
          </Heading>
          <Text pt="2" fontSize="sm">
            No
          </Text>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Food
          </Heading>
          <Text pt="2" fontSize="sm">
            Veg
          </Text>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Food checkin
          </Heading>
          <Text pt="2" fontSize="sm">
            No
          </Text>
        </Box>
      </Stack>
      <CardFooter>
        <Button variant="solid" colorScheme="blue">
          Checkin
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ParticipantCard;
