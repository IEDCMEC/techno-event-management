import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner, VStack, AbsoluteCenter } from '@chakra-ui/react';
import { useFetch } from '@/hooks/useFetch';
import { useContext } from 'react';
import { account } from '@/contexts/MyContext';
import { useMemo } from 'react';
import { useAlert } from '@/hooks/useAlert';
import axios from 'axios';
import useWrapper from '@/hooks/useWrapper';
import { useCallback } from 'react';

import { title } from 'process';


export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { accountDetails, setAccountDetails, updateAccountDetails } = useContext(account);
  const { useGetQuery, usePostMutation } = useWrapper();
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
    console.log(accountDetails);
    if (accountDetails.orgId) {
      // console.log('route')
      router.replace(`/${accountDetails.orgId}`);
    }
  }, [isAuthenticated, accountDetails.orgId]);
  useEffect(() => {
    console.log(accountDetails);
  }, [accountDetails]);
  async function postOrg() {
    const id = user.sub.substring(6);
    const name = user.nickname;
    const response = await post(`/core/organizations`, {}, { id, name });
    if(response){
      const { data, mystatus } = response; 
      console.log('created');
      if (mystatus === 200) {
        showAlert({
          title: 'Success',
          description: 'Organization has been created successfully.',
          status: 'success',
        });
      }
    }
    else{
      showAlert({
        title:"Authentication Error",
        description:"Log out and then sign in again!!"
      })
    }

    
  }

  const {
    data: userCredsData,
    status: userCredsStatus,
    error: credsError,
  } = useGetQuery('/core/users/mycreds', '/core/users/mycreds', {}, {}, (response) => {
    setAccountDetails((preValue) => ({
      ...preValue,
      role: response.data.data.role,
      orgId: response.data.data.organizationId,
    }));
  });
  // const { mutate: postOrg } = usePostMutation('/core/organizations', {
  //   onSuccess: () => {
  //     showAlert({
  //       title: 'Success',
  //       description: 'Organization has been created successfully.',
  //       status: 'success',
  //     });
  //   },
  //   onError: (error) => {
  //     console.error('Error creating organization:', error);
  //   },
  // });

  // Replace the `useMemo` with the updated `checkOrg` logic
  useMemo(() => {
    if (isAuthenticated) {
      console.log(userCredsData, userCredsStatus);
      if (userCredsStatus === 'success' && userCredsData) {
        console.log(userCredsData);
      } else if (userCredsStatus !== 'loading' && userCredsStatus !== 'error') {
        const id = user.sub.substring(6);
        const name = user.nickname;
        postOrg({ id, name }); // Triggering the POST request using usePostMutation
        // router.replace('/404'); // Uncomment if you want to navigate to a 404 page
      }
    }
  }, [isAuthenticated, userCredsStatus, userCredsData]);

  // }
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
