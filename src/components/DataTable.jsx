import { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Loading from "./Loading";

const DataTable = ({ sessionData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Check if sessionData is a Promise and if it is pending
    if (sessionData instanceof Promise && isLoading) {
      // If sessionData is a Promise and isLoading is true, show loading component
      sessionData.then((resolvedData) => {
        setData(resolvedData);
        setIsLoading(false); // Set isLoading to false when the promise is fulfilled
      });
    }
  }, [sessionData, isLoading]);

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

  if (isLoading && data) {
    // If isLoading is true, render loading component
    return <Loading />;
  } else {
    // If isLoading is false, render the table with the fetched data
    return (
      <Box overflowX="auto" margin={16}>
        <Table variant="simple" {...tableStyles.table}>
          <Thead>
            <Tr>
              <Th {...tableStyles.th}>x-coordinates</Th>
              <Th {...tableStyles.th}>real x-coordinates</Th>
              {/* <Th {...tableStyles.th}>y-coordinates</Th>
              <Th {...tableStyles.th}>real y-coordinates</Th> */}
              <Th {...tableStyles.th}>z-coordinates</Th>
              <Th {...tableStyles.th}>real z-coordinates</Th>
              <Th {...tableStyles.th}>rotation</Th>
              <Th {...tableStyles.th}>real rotation</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td {...tableStyles.td}>{item["x_coordinate"]}</Td>
                <Td {...tableStyles.td}>{item["real_x_coordinate"]}</Td>
                {/* <Td {...tableStyles.td}>{item["y-coordinates"]}</Td>
                <Td {...tableStyles.td}>{item["real_y-coordinates"]}</Td> */}
                <Td {...tableStyles.td}>{item["z_coordinate"]}</Td>
                <Td {...tableStyles.td}>{item["real_z_coordinate"]}</Td>
                <Td {...tableStyles.td}>{item["rotation"]}</Td>
                <Td {...tableStyles.td}>{item["real_rotation"]}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  }
};

export default DataTable;
