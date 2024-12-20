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
  IconButton,
  Button,
  HStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { extendTheme } from '@chakra-ui/react';
import { useEffect } from 'react';
import { StyledText } from './ui/StyledComponents';
import { GoDotFill } from "react-icons/go";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
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
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate pagination details
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const currentData = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handlers
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

 
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
                    <Th key={column.field} color={"rgba(4, 5, 11, 0.4)"}>{column.headerName}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {currentData.map((row) => (
                  <Tr
                    key={row.id}
                    borderRadius={"8px"}
                    onClick={() => {
                      handleRowClick(row);
                      handleCheckboxChange(row);
                    }}
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  >
                    <Td borderTopLeftRadius={"8px"} borderBottomLeftRadius={"8px"}>{/*
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
                      <Td key={column.field}>{column.field=="startTime"?formatTimestamp(row[column.field]):column.field == "isRegistrationClosed" && row[column.field]?
                        <StyledText color="red"><GoDotFill/> Closed</StyledText>:column.field == "isRegistrationClosed" && !row[column.field]?<StyledText color="green"><GoDotFill/> Open </StyledText>:
                        row[column.field]}</Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <HStack spacing={2} justify="flex-end" mt={4}>
                <IconButton
                  icon={<ChevronLeftIcon />}
                  isDisabled={currentPage === 1 || totalPages === 1}
                  onClick={handlePrevious}
                  aria-label="Previous Page"
                  variant={"ghost"}
                />
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index + 1}
                    onClick={() => handlePageClick(index + 1)}
                    bg={currentPage === index + 1 ? "rgba(4, 5, 11, 0.1)" : "white"}
                    borderRadius={"8px"}
                  >
                    {index + 1}
                  </Button>
                ))}
                <IconButton
                  icon={<ChevronRightIcon />}
                  isDisabled={currentPage === totalPages || totalPages === 1}
                  onClick={handleNext}
                  aria-label="Next Page"
                  variant={"ghost"}
                />
              </HStack>
          </TableContainer>
        )}
      </Box>
    </ChakraProvider>
  );
}
