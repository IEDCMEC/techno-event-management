import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  Table,
  TableCaption,
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
  const handleRowClick = (row) => {
    router.push(`/organizations/${row.id}`);
  };

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
  const handleClick = () => {
    router.push('organizations/new');
  };
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
            onClick={handleClick}
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
        </Box>
        {/* <TableContainer width="100%" height="100%">
          <Table variant="simple">
            <TableCaption>Organizations</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {organizations.map((organization) => (
                <Tr
                  key={organization?.id}
                  onClick={() => {
                    router.push(`/organizations/${organization.id}`);
                  }}
                  cursor="pointer"
                >
                  <Td>{organization?.id}</Td>
                  <Td>{organization?.name}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>{organizations.length} organizations</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer> */}
        {/* </Box> */}
      </Flex>
    </DashboardLayout>
  );
}
