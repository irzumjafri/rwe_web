import { Box, ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import SessionNavigation from "./components/SessionNavigation";
import { useState, useEffect } from "react";
import { sessionData } from "./sessionData";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const App = () => {
  const [sessionDataFirebase, setSessionDataFirebase] = useState();

  useEffect(() => {
    console.log("Firebase Data should be fetched");
  }, [sessionDataFirebase]);

  const handleFetchFirebase = async () => {
    console.log("Firebase should fetch data");
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log(data);
    setSessionDataFirebase(data);
  };

  return (
    <ChakraProvider>
      <Box padding={16}>
        <Header handleFetchFirebase={handleFetchFirebase} />
        <SessionNavigation sessionData={sessionData} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
