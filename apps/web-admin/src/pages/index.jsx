import { useEffect } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '@/layouts/DashboardLayout';
import Landing from '@/components/landing';
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    } else {
      router.push('/organizations');
    }
  }, [isAuthenticated]);
  //   useEffect(()=>{
  // },[router.pathname])

  return <DashboardLayout>{!isAuthenticated && <Landing />}</DashboardLayout>;
}

export default Dashboard;
