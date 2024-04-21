import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import React from "react";

const DataTable = ({ sessionData }) => {
  // Custom Chakra UI style object
  const tableStyles = {
    th: {
      fontWeight: "bold",
      border: "1px solid black",
    },
    td: {
      border: "1px solid black",
      textAlign: "center",
    },
  };

  return (
    <Box overflowX="auto" margin={16}>
      <Table variant="simple" {...tableStyles.table}>
        <Thead>
          <Tr>
            <Th {...tableStyles.th}>x-coordinates</Th>
            <Th {...tableStyles.th}>real_x-coordinates</Th>
            <Th {...tableStyles.th}>y-coordinates</Th>
            <Th {...tableStyles.th}>real_y-coordinates</Th>
            <Th {...tableStyles.th}>z-coordinates</Th>
            <Th {...tableStyles.th}>real_z-coordinates</Th>
            <Th {...tableStyles.th}>rotation</Th>
            <Th {...tableStyles.th}>real_rotation</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sessionData.data.map((item, index) => (
            <Tr key={index}>
              <Td {...tableStyles.td}>{item["x-coordinates"]}</Td>
              <Td {...tableStyles.td}>{item["real_x-coordinates"]}</Td>
              <Td {...tableStyles.td}>{item["y-coordinates"]}</Td>
              <Td {...tableStyles.td}>{item["real-y-coordinates"]}</Td>
              <Td {...tableStyles.td}>{item["z-coordinates"]}</Td>
              <Td {...tableStyles.td}>{item["real-z-coordinates"]}</Td>
              <Td {...tableStyles.td}>{item["rotation"]}</Td>
              <Td {...tableStyles.td}>{item["real-rotation"]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DataTable;
