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
import { useRouter } from 'next/router';
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  const handleRouteChange = () => {
    {/* prettier-ignore */}
    if (typeof window !== 'undefined') {
      const location = window.location.href;
      if (
        location === 'http://localhost:3000/Dashboard' ||
        location === 'http://localhost:3000/Dashboard/organizations' ||
        location === 'http://localhost:3000/Dashboard/Events' ||
        location === 'http://localhost:3000/Dashboard/Participants' ||
        location === 'http://localhost:3000/Dashboard/Attributes' ||
        location === 'http://localhost:3000/Dashboard/settings' ||
        location === 'https://techno-event.vercel.app/Dashboard' ||
        location === 'https://techno-event.vercel.app/Dashboard/organizations' ||
        location === 'https://techno-event.vercel.app/Dashboard/Events' ||
        location === 'https://techno-event.vercel.app/Dashboard/Participants' ||
        location === 'https://techno-event.vercel.app/Dashboard/Attributes' ||
        location === 'https://techno-event.vercel.app/Dashboard/settings'
      ) {
        return true;
      } else {
        return false;
      }
    }

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
  };
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeError', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeError', handleRouteChange);
    };
  }, []);

  return (
    <ChakraProvider>
      <EventVariables>
        <ContextVariables>
          {handleRouteChange() && <Layout />}
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
