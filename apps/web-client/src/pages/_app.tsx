import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
// import type { AppProps } from 'next/app';
import { AppPropsWithLayout } from './events';
import ContextVariables from '@/contexts/ContextVariables';
import Navbar from '@/components/Navbar';
import SigninModal from '@/components/SigninModal';
import SignupModal from '@/components/SignupModal';
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <ChakraProvider>
      <ContextVariables>
        {/* <Navbar /> */}
        <SigninModal />
        <SignupModal />
        <Component {...pageProps} />
      </ContextVariables>
    </ChakraProvider>
  );
};

export default App;
