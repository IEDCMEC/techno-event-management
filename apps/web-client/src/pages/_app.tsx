import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { AppPropsWithLayout } from './Dashboard/[[...params]]';
import ContextVariables from '@/contexts/ContextVariables';
import SigninModal from '@/components/SigninModal';
import SignupModal from '@/components/SignupModal';
import EventVariables from '@/contexts/EventVariables';
import React from 'react';
import RouteChange from '@/components/RouteChange';
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
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
