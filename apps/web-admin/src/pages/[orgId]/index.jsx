import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button, Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import { account } from '@/contexts/MyContext';
import { useMemo } from 'react';

export default function OrganizationById() {
  const router = useRouter();
  const { orgId } = router.query;
  const { user, isAuthenticated } = useAuth0();
  // console.log(user);
  const showAlert = useAlert();

  const { loading, get } = useFetch();
  const { accountDetails, setAccountDetails } = useContext(account);
  // console.log(accountDetails.orgId);
  // console.log(orgId);
  // console.log(
  //   orgId !== undefined , orgId !== accountDetails?.orgId , accountDetails?.orgId === undefined,
  // );
  // console.log(orgId, accountDetails.orgId);
  useMemo(async () => {
    // const fetchOrganizationStats = async () => {
    if (orgId !== undefined && accountDetails?.name === undefined) {
      const { data, status } = await get(`/core/organizations/${orgId}`);
      // console.log(data);
      // console.log('hihihi')
      if (status === 200) {
        setAccountDetails((preValue) => ({
          ...preValue,
          name: data.organization.name || '',
          nEvents: data.organization.numberOfEvents || 0,
          nMembers: data.organization.numberOfMembers || 0,
        }));
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    }
    // };
    // fetchOrganizationStats();
  }, [orgId]);
  // console.log(accountDetails?.orgId);
  return (
    <DashboardLayout
      pageTitle={accountDetails?.name}
      currentPage={`${accountDetails?.orgId}`}
      headerButton={
        <>
          <Button
            onClick={() => {
              router.push(`/${orgId}/settings`);
            }}
            isLoading={loading}
          >
            Organization Settings
          </Button>
        </>
      }
      debugInfo={accountDetails}
    >
      <Flex gap={4}>
        <Button
          onClick={() => {
            router.push(`/${orgId}/events`);
          }}
          isLoading={loading}
        >
          Events
        </Button>
        <Button
          onClick={() => {
            router.push(`/${orgId}/members`);
          }}
          isLoading={loading}
        >
          Members
        </Button>
      </Flex>
    </DashboardLayout>
  );
}
