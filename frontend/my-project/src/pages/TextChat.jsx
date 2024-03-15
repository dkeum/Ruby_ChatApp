import ChatLayOut from "@/components/Chat/ChatLayOut";
import NavbarApp from "@/components/NavbarApp";
import useAuth from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";

const TextChat = () => {
  const { socket } = useSocket();
  const { username } = useAuth();
  // get back who's available in the pool of people for textchatting

  useEffect(() => {
    // const availablePeople = socket.emit("getAvailableTextChat", {
    //   name: username,
    //   room: 1,
    // });

     socket.emit("enterRoom", {
      name: username,
      room: 1,
    });


    // availablePeople()
  }, []);


  return (
    <div>
      <NavbarApp />
      <ChatLayOut />
    </div>
  );
};

export default TextChat;
