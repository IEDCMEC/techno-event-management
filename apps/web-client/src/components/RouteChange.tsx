import { themeContext } from '@/contexts/ContextVariables';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const RouteChange = () => {
  const { routeChange, setrouteChange, route, setRoute } = useContext(themeContext);
  function HandleRouteChange() {
    if (typeof window !== 'undefined') {
      if (
        window.location.href === 'http://localhost:3000/Dashboard' ||
        window.location.href === 'http://localhost:3000/Dashboard/organizations' ||
        window.location.href === 'http://localhost:3000/Dashboard/Events' ||
        window.location.href === 'http://localhost:3000/Dashboard/Participants' ||
        window.location.href === 'http://localhost:3000/Dashboard/Attributes' ||
        window.location.href === 'http://localhost:3000/Dashboard/settings' ||
        window.location.href === 'https://techno-event.vercel.app/Dashboard' ||
        window.location.href === 'https://techno-event.vercel.app/Dashboard/organizations' ||
        window.location.href === 'https://techno-event.vercel.app/Dashboard/Events' ||
        window.location.href === 'https://techno-event.vercel.app/Dashboard/Participants' ||
        window.location.href === 'https://techno-event.vercel.app/Dashboard/Attributes' ||
        window.location.href === 'https://techno-event.vercel.app/Dashboard/settings'
      ) {
        setrouteChange(true);
        console.log(route);
        return true;
      } else {
        setrouteChange(false);
        console.log(route);
        return false;
      }
    }

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
  }
  const router = useRouter();
  HandleRouteChange();
  useEffect(
    () => {
      setRoute(window.location.href);
      router.events.on('routeChangeStart', HandleRouteChange);
      router.events.on('routeChangeComplete', HandleRouteChange);
      router.events.on('routeChangeError', HandleRouteChange);
      return () => {
        router.events.off('routeChangeStart', HandleRouteChange);
        router.events.off('routeChangeComplete', HandleRouteChange);
        router.events.off('routeChangeError', HandleRouteChange);
      };
    },
    typeof window !== 'undefined' ? [window.location.href] : [],
  );
  if (routeChange) {
    return <Layout />;
  } else {
    return <div></div>;
  }
};

export default RouteChange;
