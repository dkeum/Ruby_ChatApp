import ChatLayOut from "@/components/Chat/ChatLayOut";
import NavbarApp from "@/components/NavbarApp";
import useAuth from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";

const TextChat = () => {
  const { socket } = useSocket();
  const { username, avatar } = useAuth();
  const [receiver, setReceiver] = useState(null);
  // get back who's available in the pool of people for textchatting

0
  useEffect(() => {
    //for GROUP CHATS
    // socket.emit("enterRoom", {
    //   name: username,
    //   room: 1,
    // });

    //TEXT CHAT
    socket.emit("enterTextChat", {
      name: username,
      avatar,
    });

    socket.on("enterTextChat", (data) => {
      const parsedData = JSON.parse(data)
      const received = { name: parsedData.name, avatar: parsedData.avatar };
      setReceiver(received);
    });

    
  }, [receiver?.name]);

  return (
    <div>
      <NavbarApp />
      <ChatLayOut receiver={receiver} />
    </div>
  );
};

export default TextChat;
