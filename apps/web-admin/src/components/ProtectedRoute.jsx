'use client';

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
  const {
    accountDetails,
    setAccountDetails,
    updateAccountDetails,
    setUserDetails,
    allAccounts,
    setAllAccounts,
  } = useContext(account);
  const showAlert = useAlert();
  const { useGetQuery } = useWrapper();
  const handleLogin = async () => {
    loginWithRedirect({
      authorizationParams: {
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      },
    });
  };
  const { get, post } = useFetch();
  // useEffect();
  // useEffect(() => {
  //   //console.log(accountDetails);
  //   if (
  //     accountDetails &&
  //     accountDetails.orgId &&
  //     router.asPath !== `/${accountDetails.orgId}/events`
  //   ) {
  //     // // //console.log('route')
  //     router.replace(`/${accountDetails.orgId}/events`);
  //   }
  // }, [isAuthenticated, accountDetails]);
  useEffect(() => {
    // //console.log(accountDetails);
  }, [accountDetails]);
  async function postOrg() {
    const id = user.sub.substring(6);
    const name = user.nickname;
    const response = await post(`/core/organizations`, {}, { id, name });
    if (response) {
      const { data, mystatus } = response;
      //console.log('created');
      setAllAccounts([{ ...response.data }]);
      setAccountDetails(response.data);
      if (mystatus === 200) {
        showAlert({
          title: 'Success',
          description: 'Organization has been created successfully.',
          status: 'success',
        });
      }
    } else {
      showAlert({
        title: 'Authentication Error',
        description: 'Log out and then sign in again!!',
      });
    }
  }
  async function checkOrg() {
    let myResponse = await get('/core/users/mycreds');
    // //console.log(myResponse.data.data);
    if (myResponse && myResponse.status === 200) {
      console.log('Hello world');
      setAllAccounts(
        myResponse.data.data.map((value) => ({
          role: value.role,
          orgId: value.organizationId,
        })),
      );
      const response = await get('/core/organizations');
      if (response && response.status === 200) {
        setAllAccounts((preValue) => {
          const data = preValue.map((value) => {
            const orgId = value.orgId;
            const others = response.data.organizations.filter((value) => value.id === orgId)[0];
            return { ...value, ...others };
          });
          //console.log('final: ', data);
          setAccountDetails(data[0]);
          router.replace(`/${data[0].orgId}/events`);
          return data;
        });
      }
    } else {
      const id = user.sub.substring(6);
      const name = user.nickname;
      const response = await postOrg({ id, name }); // Triggering the POST request using usePostMutation
      // router.replace('/404'); // Uncomment if you want to navigate to a 404 page
      if (response && response.status !== 200) {
        showAlert({
          title: 'Authentication Error',
          description: 'Log out and then sign in again!!',
        });
      }
    }

    let userDetailsResponse = await get('/core/users/me');
    if (userDetailsResponse && userDetailsResponse.status === 200) {
      //console.log(userDetailsResponse.data);
      setUserDetails((preValue) => ({
        ...preValue,
        ...userDetailsResponse.data.accountDetails,
      }));
    }
  }
  // const {
  //   data: userCredsData,
  //   status: userCredsStatus,
  //   error: credsError,
  //   isLoading: loading,
  // } = useGetQuery('/core/users/mycreds', '/core/users/mycreds', {}, {}, (response) => {
  //   // setAccountDetails((preValue) => {
  //   //   //console.log({
  //   //     ...preValue,
  //   //     role: response.data.data.role,
  //   //     orgId: response.data.data.organizationId,
  //   //     name: user.nickname,
  //   //   });
  //   //   return {
  //   //     ...preValue,
  //   //     role: response.data.data.role,
  //   //     orgId: response.data.data.organizationId,
  //   //     name: user.nickname,
  //   //   };
  //   // });
  //   setAllAccounts(
  //     response.data.data.map((value) => ({
  //       role: value.role,
  //       orgId: value.organizationId,
  //     })),
  //   );
  // });

  // const {
  //   data: userOrgData,
  //   status: userOrgStatus,
  //   error: orgError,
  //   isLoading: myLoading,
  //   // isLoading: loading,
  // } = useGetQuery('/core/organizations', '/core/organizations', {}, {}, (response) => {
  //   //console.log(response.data.organizations);
  //   // setAllAccounts(response.data.organizations);
  //   if (allAccounts.length === 0) {
  //     setAllAccounts((preValue) => {
  //       const data = preValue.map((value) => {
  //         const orgId = value.orgId;
  //         const others = response.data.organizations.filter((value) => value.id === orgId)[0];
  //         return { ...value, ...others };
  //       });
  //       //console.log('final: ', data);
  //       setAccountDetails(data[0]);
  //       return data;
  //     });
  //   }
  // });

  //   const {
  //     data: userCredsData,
  //     status: userCredsStatus,
  //     error: credsError,
  //     isFetching: loading,
  //   } = useGetQuery('/core/users/mycreds', '/core/users/mycreds', {}, {}, (response) => {
  //     setAccountDetails((preValue) => ({
  //       ...preValue,
  //       role: response.data.data.role,
  //       orgId: response.data.data.organizationId,
  //       name: user.nickname,
  //     }));
  //   });

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
  useMemo(
    async () => {
      // if (isAuthenticated) {
      //   // //console.log(userCredsData, userCredsStatus);
      //   if (userCredsStatus === 'success' && userCredsData) {
      //     // //console.log(userCredsData);
      //   } else if (userCredsStatus !== 'loading' && userCredsStatus !== 'error') {
      //     const id = user.sub.substring(6);
      //     const name = user.nickname;
      //     postOrg({ id, name }); // Triggering the POST request using usePostMutation
      //     // router.replace('/404'); // Uncomment if you want to navigate to a 404 page
      //   }
      // }
      if (isAuthenticated) {
        await checkOrg();
      }
    },
    [isAuthenticated],
    // [isAuthenticated, userCredsStatus, userCredsData]
  );

  // }
  if (!isLoading) {
    if (!isAuthenticated && router.pathname !== '/auth' && router.pathname !== '/') {
      router.replace('/');
    } else if (isAuthenticated && !user.email_verified) {
      router.replace('/onboarding/verify-email');
      // // //console.log('reroute');
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
