import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import SessionTable from "./SessionTable";
import SessionSelector from "./SessionSelector";
import DataTable from "./DataTable";
import CoordinateGrid from "./CoordinateGrid";
// import { sessionDetails } from "../sessionData";

const SessionNavigation = ({ sessionData, fetchSessionDetails }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTestSequence, setSelectedTestSequence] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [sessionDetails, setSessionDetails] = useState(null);

  const handleSessionChange = (date, testSequence) => {
    setSelectedDate(date);
    setSelectedTestSequence(testSequence);
    setSessionDetails(null);
  };

  const handleBack = () => {
    setSessionDetails(null);
  };

  const handleDetailsClick = async (sessionId, action) => {
    await setSessionDetails(fetchSessionDetails(sessionId));

    setSelectedAction(action);
  };

  return (
    <Box>
      {!sessionDetails ? (
        <Box>
          <SessionSelector onSessionChange={handleSessionChange} />
          <SessionTable
            sessionData={sessionData}
            selectedDate={selectedDate}
            selectedTestSequence={selectedTestSequence}
            onViewDetails={(sessionId, action) => {
              handleDetailsClick(sessionId, action);
            }}
          />
        </Box>
      ) : (
        <Box>
          <Button onClick={handleBack}>Back</Button>
          {selectedAction === "View Map" ? (
            <CoordinateGrid sessionData={sessionDetails} />
          ) : (
            <DataTable sessionData={sessionDetails} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default SessionNavigation;
