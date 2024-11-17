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
import useWrapper from '@/hooks/useWrapper';

export default function OrganizationById() {
  const router = useRouter();
  const { orgId } = router.query;
  const { user, isAuthenticated } = useAuth0();
  const { useGetQuery } = useWrapper();
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

  const { data, status, error } = useGetQuery(
    `/core/organizations/${orgId}`,
    `/core/organizations/${orgId}`,
    {}, // headers
    {}, // options
    (data) => {
      setAccountDetails((prev) => ({
        ...prev,
        name: data.data.organization.name || '',
        nEvents: data.data.organization.numberOfEvents || 0,
        nMembers: data.data.organization.numberOfMembers || 0,
      }));
    },
  );

  // Use useEffect to respond to the result of the hook
  // Only trigger when data, status, or error changes
  // console.log(accountDetails?.orgId);
  return (
    <DashboardLayout
      pageTitle={accountDetails?.name}
      currentPage={`${accountDetails?.orgId}`}
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
