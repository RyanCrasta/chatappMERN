import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "./miscellaneous/SideDrawer";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";

const Chats = () => {
  const { user } = ChatState();

  console.log("hello user", user);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats />}

        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chats;
