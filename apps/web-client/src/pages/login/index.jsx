import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { loginService } from '@/services/authenticationService';

import {
  Button,
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
} from '@chakra-ui/react';

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (await loginService({ email, password })) router.push('/organizations');
    else console.error('Error when logging in');
  };

  return (
    <Flex direction="column" height="100vh" alignItems="center" justifyContent="center" gap={8}>
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold">
          Login to your account
        </Text>
        <Text>
          Don&apos;t have an account?{' '}
          <Text as="span" color="blue" fontWeight="semibold">
            <Link href="/signup">Sign up</Link>
          </Text>
        </Text>
      </Box>
      <Card width="100%" maxWidth="400px" height="auto">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired my={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired my={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>

            <Button type="submit" width="100%" my="4" isLoading={loading} loadingText="Please Wait">
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
}
