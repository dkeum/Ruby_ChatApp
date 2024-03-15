// import { UserContext } from "@/providers/AuthContext";
import  useAuth  from "@/hooks/useAuth";
import { useState, useRef } from "react";
import { Textarea } from "../ui/textarea";

const ChatBottomBar = ({ sendMessage, socket }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const { username, avatar } = useAuth();
  // const user = useContext(UserContext)

  // const handleThumbsUp = () => {
  //   const newMessage = {
  //     id: message.length + 1,
  //     name: user.name,
  //     avatar: user.avatar,
  //     message: "👍",
  //   };
  //   sendMessage(newMessage);
  //   setMessage("");
  // };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
    socket.emit('activity', "typing...")
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: message.length + 1,
        name: username,
        avatar: avatar,
        message: message.trim(),
      };
      sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2 border-t ">
      <Textarea
        autoComplete="off"
        value={message}
        ref={inputRef}
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        name="message"
        placeholder="Aa"
        className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
      ></Textarea>
    </div>
  );
};

export default ChatBottomBar;
