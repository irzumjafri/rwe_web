/* eslint-disable react/prop-types */
// Header.jsx
import { Box, Flex, Heading, Button } from '@chakra-ui/react';

const Header = () => {

  const handleSyncNowClick = () => {
    // Logic to sync data
    console.log('Syncing now...');
  };

  return (
    <Box margin={16}>
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">
          Redirected Walking Experiment
        </Heading>
        <Button colorScheme="teal" variant="solid" onClick={handleSyncNowClick}>
          Sync Now
        </Button>
      </Flex>
    </Box>
  );
};


export default Header;
