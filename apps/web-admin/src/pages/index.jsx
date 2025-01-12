'use-client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFetch } from '@/hooks/useFetch';

import DashboardLayout from '@/layouts/DashboardLayout';
import Landing from '@/components/landing';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import { account } from '@/contexts/MyContext';

function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { accountDetails } = useContext(account);
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push(`/${accountDetails.orgId}/events`);
  //   }
  // }, [router.pathname]);

  return <DashboardLayout>{!isAuthenticated && <Landing />}</DashboardLayout>;
}

export default Dashboard;
