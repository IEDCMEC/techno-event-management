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
