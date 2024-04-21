import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import SessionTable from "./SessionTable";
import SessionSelector from "./SessionSelector";
import DataTable from "./DataTable";
import CoordinateGrid from "./CoordinateGrid";
import { sessionDetails } from "../sessionData";

const SessionNavigation = ({ sessionData }) => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTestSequence, setSelectedTestSequence] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

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
            onViewDetails={(sessionId, action) => {
              setSelectedSession(sessionId);
              setSelectedAction(action);
            }}
          />
        </Box>
      ) : (
        <Box>
          <Button onClick={handleBack}>Back</Button>
          {selectedAction === "View Map" ? (
            <CoordinateGrid sessionData={sessionDetails[selectedSession]} />
          ) : (
            <DataTable sessionData={sessionDetails[selectedSession]} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default SessionNavigation;
