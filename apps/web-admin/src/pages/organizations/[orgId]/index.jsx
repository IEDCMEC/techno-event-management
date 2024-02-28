import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

import { Button, Flex } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';

import { FiArrowLeftCircle } from 'react-icons/fi';
import ItemCard from '@/components/ItemCard';
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

  const children = [
    { id: 0, section: 'events', path: '/events', thumb: '' },
    { id: 1, section: 'members', path: '/members', thumb: '' },
  ];
  return (
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="90%"
        alignItems="center"
        justifyContent="center"
        gap={8}
      >
        <Box width="100%" p={8} paddingTop="100px" display="flex" alignItems="center">
          <Box
            borderRadius="2000px"
            colorScheme="gray"
            variant="ghost"
            height="60px"
            gap="30px"
            display="inline"
            cursor="pointer"
            onClick={() => {
              router.back();
            }}
          >
            <FiArrowLeftCircle size={50} />
          </Box>
          <Text fontSize="4xl" fontWeight="bold" paddingLeft="10px">
            {orgId}
          </Text>
        </Box>

        <Box
          width="100%"
          height="100%"
          display="block"
          borderRadius="30px"
          gap="30px"
          backgroundColor="#F4F4F4"
          p="30px"
          marginLeft="30px"
        >
          {children.map((child) => {
            return (
              <Box
                key={child.id}
                as="button"
                onClick={() => {
                  router.push(`/organizations/${orgId}/${child.path}`);
                }}
              >
                <ItemCard name={child.section} logo={child.thumb} />
              </Box>
            );
          })}
        </Box>

        {/* <Box width="100%" height="100%">
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
      debugInfo={organization}
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
        */}
      </Flex>
    </DashboardLayout>
  );
}
