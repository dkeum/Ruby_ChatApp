import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatSideBar from "./ChatSideBar";
import { useEffect, useState } from "react";
import { Chat } from "./Chat";



// Refer to this link for more info
//https://github.com/jakobhoeg/shadcn-chat/tree/master

const ChatLayOut = ({receiver}) => {
  // use api calls
  //grab the expected user
  
  const [encounteredUsers, setEncounteredUsers] = useState([]);
  // between the logged in user and the receiver, "grab the message"

  // console.log("from chat layout for sidebar")
  // console.log(receiver)

  useEffect(() => {
    // setReceiver(userData);
      setEncounteredUsers([...encounteredUsers, receiver]);
    
    // console.log(receiver);
  }, [receiver?.name]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-screen min-h-[calc(100vh-5rem)] rounded-lg border bg-slate-800"
    >
      <ResizablePanel defaultSize={20} minSize={0} maxSize={20}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <ChatSideBar encounteredUser={encounteredUsers} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={15} minSize={15} maxSize={15}>
            <div className="flex h-full items-center justify-center p-6">
              <Chat selectedUser={receiver} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ChatLayOut;
