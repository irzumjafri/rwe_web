import { Box, ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import SessionNavigation from "./components/SessionNavigation";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "./components/Loading";

const App = () => {
  const [sessionDataFirebase, setSessionDataFirebase] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTestSequence, setSelectedTestSequence] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [sessionDetails, setSessionDetails] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    handleFetchSessions();
  }, []);

  const handleFetchSessions = async () => {
    const querySnapshot = await getDocs(collection(db, "LoggedData"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log(data);
    setSessionDataFirebase(data);
  };

  const handleFetchSessionDetails = async (documentId) => {
    console.log("Fetching data for session: ", documentId);
    const docRef = doc(db, "LoggedData", documentId);
    const subCollectionSnapshot = await getDocs(
      query(collection(docRef, "Data"), orderBy("timestamp"))
    );
    console.log(subCollectionSnapshot);
    const data = [];
    subCollectionSnapshot.forEach((subDoc) => {
      data.push({
        ...subDoc.data(),
        subDocId: subDoc.id,
      });
    });
    console.log(data);

    return data;
  };

  //SessionNavigation Functions
  const handleSessionChange = (date, testSequence) => {
    setSelectedDate(date);
    setSelectedTestSequence(testSequence);
    setSessionDetails(null);
    setSessionId(null);
  };

  const handleBack = () => {
    setSessionDetails(null);
    setSelectedAction(null);
    setSessionId(null);
  };

  const handleDetailsClick = async (sessionId, action) => {
    await setSessionDetails(handleFetchSessionDetails(sessionId));
    setSessionId(sessionId);
    setSelectedAction(action);
  };

  return (
    <ChakraProvider>
      <Box padding={16}>
        <Header
          handleFetchFirebase={handleFetchSessions}
          sessionId={sessionId}
          handleFetchSessionDetails={handleFetchSessionDetails}
        />
        {sessionDataFirebase ? (
          <SessionNavigation
            sessionData={sessionDataFirebase}
            selectedDate={selectedDate}
            selectedTestSequence={selectedTestSequence}
            selectedAction={selectedAction}
            sessionDetails={sessionDetails}
            handleSessionChange={handleSessionChange}
            handleBack={handleBack}
            handleDetailsClick={handleDetailsClick}
          />
        ) : (
          <Loading />
        )}
      </Box>
    </ChakraProvider>
  );
};

export default App;
