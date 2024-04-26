import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
} from "@chakra-ui/react";

const SessionTable = ({
  sessionData,
  selectedDate,
  selectedTestSequence,
  onViewDetails,
}) => {
  const filteredSessions = Object.values(sessionData).filter((session) => {
    if (selectedDate && session.date.toDate().toDateString() !== selectedDate)
      return false;
    if (selectedTestSequence && session.test_sequence !== selectedTestSequence)
      return false;
    return true;
  });

  const tableStyles = {
    th: {
      fontWeight: "bold",
      border: "1px solid black",
    },
    td: {
      border: "1px solid black",
      textAlign: "center",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-around",
    },
  };

  return (
    <Box overflowX="auto" margin={16}>
      {filteredSessions.length === 0 ? (
        <Text>No sessions found for the selected date or test sequence.</Text>
      ) : (
        <Table variant="simple" {...tableStyles.table}>
          <Thead>
            <Tr>
              <Th {...tableStyles.th}>Date</Th>
              <Th {...tableStyles.th}>Time</Th>
              <Th {...tableStyles.th}>Session ID</Th>
              <Th {...tableStyles.th}>Test Sequence</Th>
              <Th {...tableStyles.th}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredSessions.map((session) => (
              <Tr key={session.id}>
                <Td {...tableStyles.td}>
                  {session.date.toDate().toDateString()}
                </Td>
                <Td {...tableStyles.td}>
                  {session.date.toDate().toLocaleTimeString("en-US")}
                </Td>
                <Td {...tableStyles.td}>{session.id}</Td>
                <Td {...tableStyles.td}>{session.test_sequence}</Td>
                <Td {...tableStyles.td}>
                  <Box {...tableStyles.buttonContainer}>
                    <Button
                      colorScheme="blue"
                      onClick={() => onViewDetails(session.id, "View Table")}
                    >
                      View Details
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => onViewDetails(session.id, "View Map")}
                    >
                      View Map
                    </Button>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default SessionTable;
