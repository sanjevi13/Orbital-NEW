import "./share.css";
import {PermMedia, Label, Room, EmojiEmotions} from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";
export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    const desc = useRef(); //text that user wants to share
    const [file, setFile] = useState(null);
    
    const submitHandler = async (e) => { //creates new post for user
        e.preventDefault();
        const newPost = {
            userID: user._id,
            desc: desc.current.value //uses the reference JSX element
        };
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try{
                await axios.post("/upload", data)
            } catch(err){
                console.log(err);
            }
        }
        try{
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    }
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
                <input 
                    placeholder = {"What's on your mind " + user.username + "?"} 
                    className = "shareInput" 
                    ref = {desc}    
                />
            </div>
            <hr className="shareHr"/>
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="red" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                        {/* allows files to be selected and only the first file is used */}
                        <input 
                            style={{display:"none"}} 
                            type="file" 
                            id="file" accept=".png,.jpeg,.jpg" 
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
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
                <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}
