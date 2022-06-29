import "./rightbar.css"
import {Users} from "../../dummyData";
import Online from "../online/Online";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Add, Remove} from "@mui/icons-material";

export default function Rightbar({user}) { //user refers to user that rightbar is being generated for
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const [followed,  setFollowed] = useState(currentUser.following.includes(user?.id));

  
  useEffect(()=> { //obtain all of user's friends 
    const getFriends = async () => {
      try{
        const friendList = await axios("/api/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch(err){
        console.log(err);
      }
    };
    //console.log(user)
    if (user){
      getFriends();
    }
  }, [user]);
  
  const handleClick = async () => {
    console.log(user);
    try{
      if(followed){
        await axios.put("/api/users/"+ user._id + "/unfollow", {
          userID: currentUser._id
        })
        dispatch({type:"UNFOLLOW", payload: user._id})
      } else {
        await axios.put("/api/users/"+ user._id + "/follow", {
          userID: currentUser._id
        })
        dispatch({type:"FOLLOW", payload: user._id})
      }
    }catch(err){
      console.log(err);
    }
    setFollowed(!followed)
  }
  //rightbar will differ based off what page you are on
  const HomeRightBar = () => {
    return(
      <>
        <div className="birthdayContainer">
          <span className="birthdayText"></span>
        </div>
        <h4 className="rightbarTitle">Online friends</h4>
        <ul className="rightbarFriendList">
          {Users?.map((user) => (
            <Online key={user.id} user={user}/>
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove/> : <Add/>}
        </button>
      )}
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          {/* <span className="rightbarInfoValue">{user.city}</span> */}
          <span className="rightbarInfoValue">Singapore</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Course:</span>
          {/* <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : "Taken"}</span> */}
          <span className="rightbarInfoValue">Computer Science</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Status:</span>
          {/* <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : "Taken"}</span> */}
          <span className="rightbarInfoValue">Single</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        {friends?.map((friend) => (
          <Link to = {"api/profile/" + friend.username} style={{textDecoration:"none"}}> 
            <div className="rightbarFollowing">
              <img src = {
                    friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + "noProfilePic.jpg"
                  } 
                  alt="" 
                  className="rightbarFollowingImg" 
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
      </>
    )
  }
  
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar/>: <HomeRightBar/>}
      </div>
    </div>
  )
}
