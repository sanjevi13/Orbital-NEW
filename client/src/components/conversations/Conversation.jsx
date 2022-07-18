import axios from "axios";
import { useEffect, useState } from "react"
import "./conversation.css"

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null); 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId = conversation.members.find( (m) => m !== currentUser?._id); //get friend ID
    
    const getUser = async () => {
      try {
        const res = await axios("users?userID=" + friendId); // get friend's user data
        setUser(res.data);
      } catch(err) {
        console.log(err)
      }
    }
    getUser();
  }, [currentUser, conversation]) 
  
  //friend
  return (
    <div className="conversation">
        <img className="conversationImg"
        src={user?.profilePicture ? PF + user.profilePicture: PF + "noProfilePic.jpg"}
        alt="" />
        <span className="conversationName">{user?.username}</span>
    </div>
  )
}
