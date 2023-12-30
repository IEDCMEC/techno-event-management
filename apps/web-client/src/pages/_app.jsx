import '@/styles/globals.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { extendTheme, ChakraProvider, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'purple',
  }),
);

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_TOKEN);
      if (!token && router.pathname !== '/login' && router.pathname !== '/signup')
        router.push('/login');
    }
  }, [router]);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
