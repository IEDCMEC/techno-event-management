import { themeContext } from '@/contexts/ContextVariables';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const RouteChange = () => {
  const { routeChange, setrouteChange, route, setRoute } = useContext(themeContext);
  function HandleRouteChange() {
    if (typeof window !== 'undefined') {
      if (
        route === 'http://localhost:3000/Dashboard' ||
        route === 'http://localhost:3000/Dashboard/organizations' ||
        route === 'http://localhost:3000/Dashboard/Events' ||
        route === 'http://localhost:3000/Dashboard/Participants' ||
        route === 'http://localhost:3000/Dashboard/Attributes' ||
        route === 'http://localhost:3000/Dashboard/settings' ||
        route === 'https://techno-event.vercel.app/Dashboard' ||
        route === 'https://techno-event.vercel.app/Dashboard/organizations' ||
        route === 'https://techno-event.vercel.app/Dashboard/Events' ||
        route === 'https://techno-event.vercel.app/Dashboard/Participants' ||
        route === 'https://techno-event.vercel.app/Dashboard/Attributes' ||
        route === 'https://techno-event.vercel.app/Dashboard/settings'
      ) {
        setrouteChange(true);
        return true;
      } else {
        setrouteChange(false);
        return false;
      }
    }

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
  }
  const router = useRouter();
  useEffect(() => {
    setRoute(window.location.href);
    router.events.on('routeChangeStart', HandleRouteChange);
    router.events.on('routeChangeComplete', HandleRouteChange);
    router.events.on('routeChangeError', HandleRouteChange);
    return () => {
      router.events.off('routeChangeStart', HandleRouteChange);
      router.events.off('routeChangeComplete', HandleRouteChange);
      router.events.off('routeChangeError', HandleRouteChange);
    };
  }, [route]);
  if (routeChange) {
    return <Layout />;
  } else {
    return <div></div>;
  }
};

export default RouteChange;
