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
import { StyledText } from './ui/StyledComponents';
import { GoDotFill } from "react-icons/go";
const chakraTheme = extendTheme({
  colors: {
    primary: {
      500: '#319795',
    },
  },
});
export default function DataDisplay({
  loading,
  rows,
  columns,
  onRowClick,
  overflowY = 'auto',
  height = 'auto',
  state = null,
  setState = null,
}) {
  const [selectedRows, setSelectedRows] = useState([]);
  // console.log(state);
  const handleRowClick = (row) => {
    if (onRowClick) {
      onRowClick(row);
    } else {
      // console.log(row);
    }
  };
  console.log(rows);
  // //console.log(Object.keys(rows[0]));
  const handleCheckboxChange = (row) => {
    //console.log('handle')
    // //console.log(row);
    if (!state || !setState) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.includes(row.id)
          ? prevSelectedRows.filter((id) => id !== row.id)
          : [...prevSelectedRows, row.id],
      );
    } else {
      // console.log(row);
      setState(row);
    }
  };
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
  }
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
                <Tr borderBottom={"3px solid #efeef3"}>
                  <Th>{/*
                    <Checkbox
                      isChecked=
                        state === null || setState === null
                          ? selectedRows.length === rows.length
                          : state.length === rows.length
                      }
                      isIndeterminate={
                        state === null || setState === null
                          ? selectedRows.length > 0 && selectedRows.length < rows.length
                          : state.length > 0 && state.length < rows.length
                      }
                      onChange={(e) => {
                        if (!state || !setState) {
                          setSelectedRows(e.target.checked ? rows.map((row) => row.email) : []);
                        } else {
                          //console.log(e.target.indeterminate, e.target.checked);
                          // setState(e.target.checked ? )
                          setState(e.target.checked ? rows.map((row) => row.id) : []);
                        }
                      }}
                    />
                    */}
                  </Th>
                  {columns.map((column) => (
                    <Th key={column.field} color={"gray"}>{column.headerName}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {rows.map((row) => (
                  <Tr
                    key={row.id}
                    borderRadius="50%"
                    onClick={() => {
                      handleRowClick(row);
                      handleCheckboxChange(row);
                    }}
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  >
                    <Td>{/*
                      <Checkbox
                        isChecked={
                          state === null || setState === null
                            ? selectedRows.includes(row.id)
                            : state.includes(row.email)
                        }
                        onChange={() => {
                          handleCheckboxChange(row);
                        }}
                      />
                        */}
                    </Td>
                    {columns.map((column) => (
                      <Td key={column.field}>{column.field=="createdAt"?formatTimestamp(row[column.field]):column.field == "status" && row[column.field] == undefined?
                        <StyledText color="red"><GoDotFill/> Scheduled</StyledText>:
                        row[column.field]}</Td>
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
