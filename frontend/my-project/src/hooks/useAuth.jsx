import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/pages/auth/authSlice";
import {jwtDecode} from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);

    console.log(decoded.UserInfo)
    const { username, userId, avatar, gender } = decoded.UserInfo;
    const name = username;

    return { userId, username, avatar, gender, name };
  }

  return { username: "None", name:"None", gender:"other", avatar:"" };
};


export default useAuth