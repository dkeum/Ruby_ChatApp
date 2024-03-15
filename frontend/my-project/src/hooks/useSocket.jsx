import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useAuth from "./useAuth";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { userId } = useAuth();

  useEffect(() => {

    if (userId) { 
      const newSocket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
        query: {
          userId: userId,
        },
      });

      console.log("new Socket detials")
      console.log(newSocket)

      newSocket.on("connect", () => {
        console.log("WebSocket connection established");
      });

      newSocket.on("disconnect", () => {
        console.log("WebSocket connection closed");
      });

      newSocket.on("error", (error) => {
        console.error("WebSocket error:", error);
      });

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userId]);

  const value = useMemo(
    () => ({
      socket,
      onlineUsers,
    }),
    [socket, onlineUsers]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
