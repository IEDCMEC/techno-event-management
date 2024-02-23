import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button, Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';

export default function OrganizationById() {
  const router = useRouter();
  const { orgId } = router.query;
  const showAlert = useAlert();

  const { loading, get } = useFetch();

  const [organization, setOrganization] = useState([]);

  useEffect(() => {
    const fetchOrganizationStats = async () => {
      const { data, status } = await get(`/core/organizations/${orgId}`);
      if (status === 200) {
        setOrganization(data.organization || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchOrganizationStats();
  }, []);

  return (
    <DashboardLayout
      pageTitle={organization?.name}
      previousPage={`/organizations`}
      headerButton={
        <>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/settings`);
            }}
            isLoading={loading}
          >
            Organization Settings
          </Button>
        </>
      }
      debugInfo={JSON.stringify(organization)}
    >
      <Flex gap={4}>
        <Button
          onClick={() => {
            router.push(`/organizations/${orgId}/events`);
          }}
          isLoading={loading}
        >
          Events
        </Button>
        <Button
          onClick={() => {
            router.push(`/organizations/${orgId}/members`);
          }}
          isLoading={loading}
        >
          Members
        </Button>
      </Flex>
    </DashboardLayout>
  );
}
