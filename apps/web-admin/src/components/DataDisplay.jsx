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
const chakraTheme = extendTheme({
  colors: {
    primary: {
      500: '#319795',
    },
  },
});
export default function DataDisplay({ loading, rows, columns, onRowClick }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const handleRowClick = (row) => {
    onRowClick(row);
  };

  const handleCheckboxChange = (rowId) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(rowId)
        ? prevSelectedRows.filter((id) => id !== rowId)
        : [...prevSelectedRows, rowId],
    );
  };
  return (
    <ChakraProvider theme={chakraTheme}>
      <Box p={4}>
        {loading ? (
          <Spinner size="xl" color="primary.500" />
        ) : (
          <TableContainer>
            <Table variant="simple" overflowY={'auto'}>
              <Thead>
                <Tr>
                  <Th>
                    <Checkbox
                      isChecked={selectedRows.length === rows.length}
                      isIndeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                      onChange={(e) =>
                        setSelectedRows(e.target.checked ? rows.map((row) => row.id) : [])
                      }
                    />
                  </Th>
                  {columns.map((column) => (
                    <Th key={column.field}>{column.headerName}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {rows.map((row) => (
                  <Tr
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  >
                    <Td>
                      <Checkbox
                        isChecked={selectedRows.includes(row.id)}
                        onChange={() => handleCheckboxChange(row.id)}
                      />
                    </Td>
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
