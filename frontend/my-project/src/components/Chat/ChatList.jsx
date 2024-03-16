import { useEffect, useRef } from "react";
import ChatBottomBar from "./ChatBottomBar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

const ChatList = ({ messages, sendMessage}) => {
  const { username } = useAuth();
  // console.log(user)
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  // console.log("inside of chatlist component");
  // console.log(messages);

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
                "flex flex-col gap-2 p-4 whitespace-pre-wrap ",
                message.name !== username ? "items-end" : "items-start"
              )}
            >
              <div className="flex flex-col gap-3 items-center">
                {message.name === username && (
                  <>
                    <div className="flex flex-row gap-x-3">
                      <Avatar className="flex justify-center items-center">
                        <AvatarImage
                          src={message.avatar}
                          alt={message.name}
                          width={6}
                          height={6}
                        />
                      </Avatar>
                      <p className=" bg-accent p-3 rounded-md ">
                        {message.message}
                      </p>
                    </div>
                    <p className="text-white flex w-full items-start">
                      {" "}
                      {message.time}
                    </p>
                  </>
                )}

                {message.name !== username && (
                  <>
                    <div className="flex flex-row gap-x-3">
                      <Avatar className="flex justify-center items-center">
                        <AvatarImage
                          src={message.avatar}
                          alt={message.name}
                          width={6}
                          height={6}
                        />
                      </Avatar>
                      <p className=" bg-accent p-3 rounded-md">
                        {message.message}
                      </p>
                    </div>
                    <p className="text-white flex w-full justify-end">
                      {message.time}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatBottomBar sendMessage={sendMessage} />
    </div>
  );
};

export default ChatList;
