import React, { useEffect, useState } from "react";
import axios from "axios";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const chats = await axios.get("/api/chats");
    console.log(chats);
    setChats(chats.data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => {
        return <div>{chat.chatName}</div>;
      })}
    </div>
  );
};

export default Chats;
