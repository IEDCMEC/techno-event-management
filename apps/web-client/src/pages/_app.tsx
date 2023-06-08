import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import ContextVariables from '@/Contexts/ContextVariables';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ContextVariables>
        <Component {...pageProps} />
      </ContextVariables>
    </ChakraProvider>
  );
}
