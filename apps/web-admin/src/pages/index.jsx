'use-client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFetch } from '@/hooks/useFetch';

import DashboardLayout from '@/layouts/DashboardLayout';
import Landing from '@/components/landing';
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { loading, get, post } = useFetch();
  async function postOrg() {
    const id = user.sub.substring(6);
    const name = user.nickname;
    const { data, mystatus } = await post(`/core/organizations`, {}, { id, name });
    if (mystatus === 200) {
      showAlert({
        title: 'Success',
        description: 'Organization has been created successfully.',
        status: 'success',
      });
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    } else {
      async function getOrg() {
        const { data, status } = await get(`/core/organization/${user.sub.substring(6)}`);
        if (status === 404 || status === 500) {
          await postOrg();
        }
      }
      getOrg();
      router.push(`/organizations/${user.sub.substring(6)}`);
      console.log(user);
      console.log(user.sub.substring(6));
    }
  }, [isAuthenticated]);
  //   useEffect(()=>{
  // },[router.pathname])

  return <DashboardLayout>{!isAuthenticated && <Landing />}</DashboardLayout>;
}

export default Dashboard;
