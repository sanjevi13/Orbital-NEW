import { useEffect, useState } from "react";
import "./closeFriend.css";
import axios from "axios";

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [name, setName] = useState("");
  
  useEffect(() => { //adds names of friends to sidebar
    const addName = async () => {
      const userInfo = (await axios.get(`/users/?userID=${user}`)).data;
      console.log(userInfo);
      setName(userInfo.username);
    };
    addName();
  }, [name]);
  
  return (
    <li className="sidebarFriend">
        <img 
          className="sidebarFriendImg" 
          src = { user.profilePicture ? PF + user.profilePicture: PF + "noProfilePic.jpg" } 
          alt="" 
        />
        <span className="sidebarFriendName">{name ? name : "why are u"}  </span>
    </li> 
  )
}
