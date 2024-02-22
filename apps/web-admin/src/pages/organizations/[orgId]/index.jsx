import { useRouter } from 'next/router';

import { Box, Button, Flex, Text } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { FiArrowLeftCircle } from 'react-icons/fi';
import ItemCard from '@/components/ItemCard';
export default function Organization() {
  const router = useRouter();

  const { orgId } = router.query;

  const children = [
    { id: 0, section: 'events', path: '/events', thumb: '' },
    { id: 1, section: 'members', path: '/members', thumb: '' },
  ];
  return (
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap={8}
      >
        <Box width="100%" p={8} display="flex" justifyContent="space-between">
          <Box width="100%" p={8} paddingTop="100px" display="flex" alignItems="center" gap="10px">
            <Box
              borderRadius="2000px"
              borderColor="black"
              colorScheme="gray"
              variant="ghost"
              height="60px"
              display="inline"
              cursor="pointer"
              onClick={() => {
                router.back();
              }}
            >
              <FiArrowLeftCircle size={60} />
            </Box>
            <Text fontSize="6xl" fontWeight="bold">
              {orgId}
            </Text>
          </Box>
        </Box>

        <Box
          width="100%"
          height="100%"
          borderRadius="30px"
          gap="50px"
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

          {/* <Box width="100%" height="100%">
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/events`);
            }}
          >
            Events
          </Button>
          <Button
            onClick={() => {
              router.push(`/organizations/${orgId}/members`);
            }}
          >
            Members
          </Button>
        </Box> */}
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
