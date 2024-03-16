import { useState, useEffect } from "react";
import ChatTopBar from "./ChatTopBar";
import ChatList from "./ChatList";
import { useSocket } from "@/hooks/useSocket";

export function Chat({ selectedUser }) {
  const { socket } = useSocket();
  const [messagesState, setMessages] = useState([]);

  const sendMessage = (newMessage) => {
    socket.emit("message", JSON.stringify(newMessage));
  };

  useEffect(() => {
    socket.on("message", (data) => {
      try {
        const parsedData = JSON.parse(data);
        
        setMessages((prevMessages) => {
          const lastMessage = prevMessages.slice(-1)[0];
          // console.log(prevMessages);
  
          if (lastMessage && lastMessage.name === "ADMIN") {
            // Remove the last message if it's from ADMIN
            prevMessages.pop();
          }
          
          return [...prevMessages, parsedData];
        });
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    });
  }, []);

  useEffect(() => {
    let activtyTimer;
    socket.on("activity", (name) => {
      // console.log("activity is happening");
      setMessages((prevMessages) => {
        const data = JSON.parse(name);
        // console.log(data);
        const lastMessage = prevMessages.slice(-1)[0];
        // console.log(prevMessages);

        if (lastMessage && lastMessage.name !== "ADMIN") {
          return [...prevMessages, data];
        } else {
          return prevMessages;
        }
      });

      clearTimeout(activtyTimer);
      activtyTimer = setTimeout(() => {
        setMessages((prevMessages) => {
          const lastMessage = prevMessages.slice(-1)[0];
          if (lastMessage && lastMessage.name === "ADMIN") {
            return prevMessages.slice(0, -1);
          } else {
            return prevMessages;
          }
        });
      }, 1000);
    });
  }, [messagesState]);

  return (
    <div className="flex flex-col justify-between w-full h-full">
    
          <ChatTopBar selectedUser={selectedUser} />
          <ChatList
            messages={messagesState}
            sendMessage={sendMessage}
          />

    </div>
  );
}
