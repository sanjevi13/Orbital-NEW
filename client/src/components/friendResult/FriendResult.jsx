import React from 'react'
import "./friendResult.css"
import {MoreVert, Add, Remove} from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config";
import { AuthContext } from "../../context/AuthContext";

export default function FriendResult({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const [followed,  setFollowed] = useState(false);
  
  useEffect(() => { //ensure follow button renders correctly
    setFollowed(currentUser.following.includes(user?._id))
  }, [user]);
  
  const handleClick = async () => {
    console.log(user);
    try{
      if(followed){
        await axios.put("/users/"+ user._id + "/unfollow", {
          userID: currentUser._id
        })
        dispatch({type:"UNFOLLOW", payload: user._id})
      } else {
        await axios.put("/users/"+ user._id + "/follow", {
          userID: currentUser._id
        })
        dispatch({type:"FOLLOW", payload: user._id})
      }
    }catch(err){
      console.log(err);
    }
    setFollowed(!followed)
  }
  
  return (
    <div className="searchResult">
        <div className="searchResultWrapper">
            <div className="searchResultTop">
                <div className="searchResultTopLeft">
                    <Link to={"profile/" + user.username}>
                    <img src={user.profilePicture ? 
                            PF + user.profilePicture : 
                            PF + "noProfilePic.jpg"
                        } 
                    alt="" className="searchResultProfileImg" />
                    </Link>
                    <span className="searchResultUsername">{user.username}</span>
                </div>
                <div className="searchResultTopRight">
                    <button className="followButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove/> : <Add/>}
                    </button>
                    <div className="moreVertWrapper">
                        <MoreVert/>
                    </div>    
                </div>
            </div>
            <div className="searchResultCenter">
            </div>
            <div className="searchResultBottom">
                <div className="searchResultBottomLeft">
                </div>
                <div className="searchResultBottomRight">
                </div>
            </div>
        </div>
    </div>
  )
}
