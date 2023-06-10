import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
// import type { AppProps } from 'next/app';
import { AppPropsWithLayout } from './events';
import ContextVariables from '@/Contexts/ContextVariables';
import Navbar from '@/Components/Navbar';
import SigninModal from '@/Components/SigninModal';
import SignupModal from '@/Components/SignupModal';
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
