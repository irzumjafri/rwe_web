import { Box, ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import SessionNavigation from "./components/SessionNavigation";
import { useState, useEffect } from "react";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "./components/Loading";

const App = () => {
  const [sessionDataFirebase, setSessionDataFirebase] = useState();

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
    const subCollectionSnapshot = await getDocs(collection(docRef, "Data"));
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

  return (
    <ChakraProvider>
      <Box padding={16}>
        <Header handleFetchFirebase={handleFetchSessions} />
        {sessionDataFirebase ? (
          <SessionNavigation
            sessionData={sessionDataFirebase}
            fetchSessionDetails={handleFetchSessionDetails}
          />
        ) : (
          <Loading />
        )}
      </Box>
    </ChakraProvider>
  );
};

export default App;
