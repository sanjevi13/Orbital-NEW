import "./message.css"
import {format} from "timeago.js"

export default function Message({message, own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg"
             src="https://e0.365dm.com/17/12/1600x900/skysports-cristiano-ronaldo-real-madrid-football_4178227.jpg?20171209155617"
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
