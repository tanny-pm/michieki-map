import { Box, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import "maplibre-gl/dist/maplibre-gl.css";
import React from "react";
import Legend from "./components/Legend";
import Map from "./components/Map";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Flex direction="column" height="100vh" minWidth="100vw">
        <Box backgroundColor="blue.500" p={2}>
          <Heading as="h1" size="md" color="white">
            道の駅マップ
          </Heading>
        </Box>
        <Box flex="1" position="relative">
          <Map zoom={[5]} center={[139.6917, 35.6895]} />
          <Legend />
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
