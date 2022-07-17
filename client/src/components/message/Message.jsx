import "./message.css"
import {format} from "timeago.js"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react";

export default function Message({message, own}) {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg"
                        src={
                          user.profilePicture 
                              ? PF + user.profilePicture
                              : PF + "noProfilePic.jpg"
                          } 
             alt="" 
            />
            <p className="messageText">
              {message.text}
            
            </p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>

    </div>
  )
}
