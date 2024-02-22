import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Flex,
  Table,
  TableCaption,
  Card,
  CardBody,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  TableContainer,
  Text,
  Button,
} from '@chakra-ui/react';

import { useFetch } from '@/hooks/useFetch';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material';
const MuiTheme = createTheme({});

import DashboardLayout from '@/layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';

import ItemCard from '@/components/ItemCard';

export default function Organizations() {
  const router = useRouter();
  const { orgId } = router.query;

  const { loading, get } = useFetch();

  const [organizations, setOrganizations] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <div
          onClick={() => {
            router.push(`/organizations/${params.row.id}`);
          }}
          style={{ cursor: 'pointer' }}
        >
          {params.value}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchOrganizations = async () => {
      const { data, status } = await get('/core/organizations');
      setOrganizations(data.organizations || []);
    };
    fetchOrganizations();
  }, []);

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
            Organizations
          </Text>
        </Box>

        <Box
          display="block"
          borderRadius="30px"
          gap="30px"
          backgroundColor="#F4F4F4"
          p="30px"
          marginLeft="30px"
        >
          <Button
            padding="4"
            minWidth="-moz-initial"
            bgColor="rgb(128, 90, 213)"
            color="white"
            _hover={{ bgColor: 'rgb(100, 70, 183)' }}
            onClick={() => {
              router.push('organizations/new');
            }}
            marginBottom="30px"
          >
            Add Organization
          </Button>
          <Box width="100%" height="100%" borderRadius="30px" display="flex" gap="30px">
            {/* <ThemeProvider theme={MuiTheme}> */}
            {organizations.map((organization) => {
              return (
                <Box
                  key={organization.id}
                  as="button"
                  width="180px"
                  height=" 180px"
                  onClick={() => {
                    router.push(`/organizations/${organization.id}`);
                  }}
                >
                  <ItemCard name={organization.name} logo="" />
                </Box>
              );
            })}
          </Box>

          {/*<DataGrid
              rows={organizations}
              columns={columns}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              slots={{
                toolbar: GridToolbar,
              }}
              autoHeight
              sx={{
                // disable cell selection style
                '.MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
                // pointer cursor on ALL rows
                '& .MuiDataGrid-row:hover': {
                  cursor: 'pointer',
                },
              }}
              onRowClick={handleRowClick}
            />*/}

          {/* </ThemeProvider> */}
          {organizations.length === 0 && (
            <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
              <Text fontSize="2xl" fontWeight="semibold">
                You do not have any organizations yet. Please{' '}
                <Link href="/organizations/new">
                  <Text as="span" color="purple" textDecoration="underline">
                    create one
                  </Text>
                </Link>{' '}
                to start managing events.
              </Text>
            </Flex>
          )}
          <Flex gap={4}>
            {organizations.map((organization) => (
              <Card
                key={organization.id}
                cursor="pointer"
                onClick={() => {
                  router.push(`/organizations/${organization.id}`);
                }}
              >
                <CardBody>
                  <Text>{organization?.id}</Text>
                  <Text>{organization?.name}</Text>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}
