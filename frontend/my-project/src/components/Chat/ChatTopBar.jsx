import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatTopBar = ({ selectedUser }) => {


  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center ">
          <AvatarImage
            src={selectedUser.avatar}
            alt={selectedUser.name}
            width={10}
            height={10}
            className="w-10 h-10"
          />
          <AvatarFallback>{selectedUser.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-medium text-3xl text-white ">
            Chatting with {selectedUser.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatTopBar;
