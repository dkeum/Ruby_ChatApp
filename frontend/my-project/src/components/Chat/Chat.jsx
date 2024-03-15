import { useState, useEffect } from "react";
import ChatTopBar from "./ChatTopBar";
import ChatList from "./ChatList";
import { useSocket } from "@/hooks/useSocket";

export function Chat({ messages, selectedUser }) {
  const { socket } = useSocket();
  const [messagesState, setMessages] = useState(messages);


  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
      try {
        const parsedData = JSON.parse(data);
        setMessages((prevMessages) => [...prevMessages, parsedData]);
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    },[]);

    let activtyTimer;
    socket.on("activity", (name) => {
      setMessages((prevMessages) => {
        const data = JSON.parse(name);
        const lastMessage = prevMessages.slice(-1)[0];

        if (lastMessage && lastMessage.name !== data.name) {
          return [...prevMessages, data];
        } else {
          return prevMessages;
        }
      });

      clearTimeout(activtyTimer);
      activtyTimer = setTimeout(() => {
        setMessages((prevMessages) => {
          const lastMessage = prevMessages.slice(-1)[0];
          if (lastMessage && lastMessage.name === "admin") {
            return prevMessages.slice(0, -1);
          } else {
            return prevMessages;
          }
        });
      }, 2000);
    });
  }, []);

  const sendMessage = (newMessage) => {
    socket.emit("message", JSON.stringify(newMessage));
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {selectedUser !== null && (
        <>
          <ChatTopBar selectedUser={selectedUser} />
          <ChatList
            messages={messagesState}
            sendMessage={sendMessage}
            socket={socket}
          />
        </>
      )}
    </div>
  );
}
