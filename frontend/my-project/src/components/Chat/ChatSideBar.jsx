import { Avatar, AvatarImage } from "../ui/avatar";

const ChatSideBar = ({ encounteredUser }) => {

  // console.log("encountered user")
  // console.log(encounteredUser)

  return (
    <div className="w-full h-full">
      <header className="w-full border-b">
        <h1 className="text-white text-2xl font-semibold text-center p-2">
          Encountered Users
        </h1>
      </header>

      <section>
        {encounteredUser.map((user, index) => (
          <div key={index} className="flex items-center space-x-2 p-2 justify-center ">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={user.avatar} // Accessing avatar from user object
                alt={user.name} // Accessing name from user object
                width={40} // Adjust width to appropriate value
                height={40} // Adjust height to appropriate value
                className="w-full h-full rounded-full"
              />
            </Avatar>
            <span className="text-white">{user.name}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ChatSideBar;
