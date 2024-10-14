import React from 'react';
import MyContext from '@/contexts/MyContext';
import { extendTheme, ChakraProvider, withDefaultColorScheme } from '@chakra-ui/react';
import { Auth0Provider } from '@auth0/auth0-react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import '../styles/globals.css';

const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'teal',
  }),
);

export default function App({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <MyContext>
        <ProtectedRoute>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </ProtectedRoute>
      </MyContext>
    </Auth0Provider>
  );
}
