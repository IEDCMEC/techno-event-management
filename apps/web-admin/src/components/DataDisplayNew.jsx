import {
    ChakraProvider,
    Box,
    Spinner,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Checkbox,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { extendTheme } from '@chakra-ui/react';
  import { useEffect } from 'react';
  const chakraTheme = extendTheme({
    colors: {
      primary: {
        500: '#319795',
      },
    },
  });
  export default function DataDisplayNew({
    loading,
    rows,
    columns,
    onRowClick,
    overflowY = 'auto',
    height = 'auto',
    state = null,
    setState = null,
  }) {
    //const [selectedRows, setSelectedRows] = useState([]);
    // console.log(state);
    
    // //console.log(Object.keys(rows[0]));
    
    // useEffect(() => {
    //   //console.log(selectedRows);
    // }, [selectedRows]);
    return (
      <ChakraProvider theme={chakraTheme}>
        <Box p={4}>
          {loading ? (
            <Spinner size="xl" color="primary.500" />
          ) : (
            <TableContainer height={height} overflowY={overflowY} sx={{}}>
              <Table variant="simple" overflowY={overflowY}>
                <Thead>
                  <Tr>
                    {columns.map((column) => (
                      <Th key={column.field}>{column.headerName}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {rows.map((row) => (
                    <Tr
                      key={row.id}
                      _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                    >
                      {columns.map((column) => (
                        <Td key={column.field}>{row[column.field]}</Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </ChakraProvider>
    );
  }
  