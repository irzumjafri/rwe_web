import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import SessionTable from "./SessionTable";
import SessionSelector from "./SessionSelector";
import DataTable from "./DataTable";
import { sessionDetails } from "../sessionData";

const SessionNavigation = ({ sessionData }) => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTestSequence, setSelectedTestSequence] = useState("");

  const handleSessionChange = (date, testSequence) => {
    setSelectedDate(date);
    setSelectedTestSequence(testSequence);
    setSelectedSession(null); // Reset selected session when filtering
  };

  const handleBack = () => {
    setSelectedSession(null); // Go back to session table view
  };

  return (
    <Box>
      {!selectedSession ? (
        <Box>
          <SessionSelector onSessionChange={handleSessionChange} />
          <SessionTable
            sessionData={sessionData}
            selectedDate={selectedDate}
            selectedTestSequence={selectedTestSequence}
            onViewDetails={setSelectedSession}
          />
        </Box>
      ) : (
        <Box>
          <Button onClick={handleBack}>Back</Button>
          <DataTable sessionData={sessionDetails[selectedSession]} />
        </Box>
      )}
    </Box>
  );
};

export default SessionNavigation;
