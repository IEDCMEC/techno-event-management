import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner, VStack, AbsoluteCenter } from '@chakra-ui/react';
import { useFetch } from '@/hooks/useFetch';
import { useContext } from 'react';
import { account } from '@/contexts/MyContext';
import { useMemo } from 'react';

export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { accountDetails, setAccountDetails, updateAccountDetails } = useContext(account);

  const handleLogin = async () => {
    loginWithRedirect({
      authorizationParams: {
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      },
    });
  };
  const { loading, get, post } = useFetch();
  // useEffect();
  useMemo(() => {
    // console.log(accountDetails);
    if (accountDetails.orgId) {
      // console.log('route')
      router.replace(`/${accountDetails.orgId}`);
      // console.log('trigger');
      // console.log(accountDetails);
    }
  }, [isAuthenticated, accountDetails.orgId]);
  async function postOrg() {
    const id = user.sub.substring(6);
    const name = user.nickname;
    const { data, mystatus } = await post(`/core/organizations`, {}, { id, name });
    console.log('created');
    if (mystatus === 200) {
      showAlert({
        title: 'Success',
        description: 'Organization has been created successfully.',
        status: 'success',
      });
    }
  }
  async function checkOrg() {
    const response = await get('/core/users/mycreds');
    // console.log(response.data.data);
    if (response.status === 200) {
      setAccountDetails((preValue) => {
        return {
          ...preValue,
          role: `${response.data.data.role}`,
          orgId: `${response.data.data.organizationId}`,
        };
      });
    } else {
      postOrg();
    }
  }

  // useEffect();
  useMemo(() => {
    // if (!isAuthenticated) {
    //   router.replace('/');
    //   console.log('not check')
    // } else {
    //   checkOrg();
    //   // console.log(user.sub.substring(6));
    // }
    if (isAuthenticated) {
      checkOrg();
      // console.log('trigger');
    }
  }, [isAuthenticated]);
  if (!isLoading) {
    if (!isAuthenticated && router.pathname !== '/auth' && router.pathname !== '/') {
      router.replace('/');
    } else if (isAuthenticated && !user.email_verified) {
      router.replace('/onboarding/verify-email');
      // console.log('reroute');
      return children;
    }
    return children;
  }

  return (
    <div>
      <AbsoluteCenter>
        <VStack>
          <Spinner boxSize={70} thickness="7px" speed="0.9s" color="purple" emptyColor="grey" />
        </VStack>
      </AbsoluteCenter>
    </div>
  );
};
