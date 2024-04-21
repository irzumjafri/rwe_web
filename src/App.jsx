import { Box, ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import SessionNavigation from "./components/SessionNavigation";
import { sessionData } from "./sessionData";

const App = () => {
  return (
    <ChakraProvider>
      <Box padding={16}>
        <Header />
        <SessionNavigation sessionData={sessionData} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
