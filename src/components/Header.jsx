import { Box, Flex, Heading, Button } from "@chakra-ui/react";

const Header = ({
  handleFetchFirebase,
  sessionId,
  handleFetchSessionDetails,
}) => {
  const handleSyncClick = () => {
    handleFetchFirebase();
    if (sessionId) {
      handleFetchSessionDetails(sessionId);
    }
  };
  return (
    <Box margin={16}>
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">
          Redirected Walking Experiment
        </Heading>

        <Button colorScheme="teal" variant="solid" onClick={handleSyncClick}>
          Sync Now
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
