import "./sidebar.css"
import {RssFeed, Event} from "@mui/icons-material";
import CloseFriend from "../closeFriend/CloseFriend";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Sidebar() {
  const {user} = useContext(AuthContext);
  return (
    <div className="sidebar"> 
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon"/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon"/>
            <span className="sidebarListItemText">Events</span>
          </li>
        </ul>
        <button className="sidebarButton">Show more</button>
        <hr className="sidebarHr"/>
        <ul className="sidebarFriendList">
          <div className="sidebarFriendListHeader">Friends</div>
          {user.following.map(u => 
            <CloseFriend key={u._id} user={u}/>  
          )}
        </ul>
      </div>
    </div>
  )
}
