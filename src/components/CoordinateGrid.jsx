import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const CoordinateGrid = ({ sessionData }) => {
  return (
    <Flex direction="column" alignItems="center">
      {sessionData.data.map((item, index) => (
        <Flex key={index} justify="center" marginBottom="8px">
          <Box
            width="50px"
            height="50px"
            border="1px solid black"
            textAlign="center"
            marginRight="8px"
          >
            <Text fontWeight="bold">x: {item["x-coordinates"]}</Text>
            <Text fontWeight="bold">y: {item["y-coordinates"]}</Text>
            <Text fontWeight="bold">z: {item["z-coordinates"]}</Text>
          </Box>
          <Box
            width="50px"
            height="50px"
            border="1px solid black"
            textAlign="center"
          >
            <Text fontWeight="bold">real x: {item["real_x-coordinates"]}</Text>
            <Text fontWeight="bold">real y: {item["real_y-coordinates"]}</Text>
            <Text fontWeight="bold">real z: {item["real_z-coordinates"]}</Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

export default CoordinateGrid;
