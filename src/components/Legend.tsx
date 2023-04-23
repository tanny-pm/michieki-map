// Legend.tsx
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Legend: React.FC = () => {
  return (
    <Box
      position="absolute"
      top="10px"
      right="10px"
      backgroundColor="white"
      borderRadius="md"
      boxShadow="md"
      padding="4"
    >
      <Box display="flex" alignItems="center" marginBottom="1">
        <Box
          width="14px"
          height="14px"
          backgroundColor="orange"
          marginRight="2"
          borderRadius="50%"
        />
        <Text fontSize="xs">お食事処あり</Text>
      </Box>
      <Box display="flex" alignItems="center">
        <Box
          width="14px"
          height="14px"
          backgroundColor="red"
          marginRight="2"
          borderRadius="50%"
        />
        <Text fontSize="xs">温泉施設あり</Text>
      </Box>
    </Box>
  );
};

export default Legend;
