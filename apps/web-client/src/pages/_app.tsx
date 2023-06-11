import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
// import type { AppProps } from 'next/app';
import { AppPropsWithLayout } from './Dashboard/[[...params]]';
import ContextVariables from '@/contexts/ContextVariables';
import Navbar from '@/components/Navbar';
import SigninModal from '@/components/SigninModal';
import SignupModal from '@/components/SignupModal';
import { useEffect } from 'react';
import EventVariables from '@/contexts/EventVariables';
import Layout from '@/components/Layout';
import { themeContext } from '@/contexts/ContextVariables';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import RouteChange from '@/components/RouteChange';
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { routeChange, setrouteChange, route, setRoute } = useContext(themeContext);

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <ChakraProvider>
      <EventVariables>
        <ContextVariables>
          <RouteChange />
          {/* <Navbar /> */}
          <SigninModal />
          <SignupModal />
          <Component {...pageProps} />
        </ContextVariables>
      </EventVariables>
    </ChakraProvider>
  );
};

export default App;
