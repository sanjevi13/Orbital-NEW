import "./share.css";
import {PermMedia, Label, Room, EmojiEmotions} from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img    
                src={
                user.profilePicture 
                    ? PF + user.profilePicture
                    : PF + "person/maguire.png"
                }  
                alt="" 
                className="shareProfileImg"/>
                <input placeholder="What's in your mind?" className="shareInput" />
            </div>
            <hr className="shareHr"/>
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <PermMedia htmlColor="red" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                    </div>
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton">Share</button>
            </div>
        </div>
    </div>
  )
}
