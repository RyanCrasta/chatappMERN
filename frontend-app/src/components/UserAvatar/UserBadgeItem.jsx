import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

export const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px="2"
      py="1"
      borderRadius="lg"
      m="1"
      mb="2"
      variant="solid"
      fontSize="12"
      backgroundColor="purple"
      cursor="pointer"
      color="white"
    >
      {user.name}

      <CloseIcon p="1" onClick={() => handleFunction(user)} />
    </Box>
  );
};
