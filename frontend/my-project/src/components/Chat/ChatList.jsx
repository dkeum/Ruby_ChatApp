import { useEffect, useRef } from "react";
import ChatBottomBar from "./ChatBottomBar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

const ChatList = ({ messages, sendMessage, socket }) => {
  const { username: user } = useAuth();
  // console.log(user)
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <div>
          {messages?.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.name !== user.name ? "items-end" : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                {message.name === user.name && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                <span className=" bg-accent p-3 rounded-md max-w-xs">
                  {message.message}
                </span>
                {message.name !== user.name && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatBottomBar sendMessage={sendMessage} socket={socket} />
    </div>
  );
};

export default ChatList;
