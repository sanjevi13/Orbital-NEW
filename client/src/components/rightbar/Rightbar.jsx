 import "./rightbar.css"
import Online from "../online/Online";
import {useEffect, useState, useContext, useRef} from "react";
import {io} from "socket.io-client";
import ChatOnline from "../chatOnline/ChatOnline";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Add, Remove} from "@mui/icons-material";
import EditProfile from "../editProfile/EditProfile";
import { useAuth } from "../../firebase";

export default function Rightbar({user}) { //user refers to user that rightbar is being generated for
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const [followed,  setFollowed] = useState(false);
  const [city, setCity] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");

  useEffect(()=> { //obtain all of user's friends 
    const getFriends = async () => {
      try{
        // console.log(user);
        const friendList = await axios("/users/friends/" + user?._id);
        setFriends(friendList.data);
      } catch(err){
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  useEffect(() => { //ensure follow button renders correctly
    setFollowed(currentUser.following.includes(user?._id))
  }, [user]);
  
  useEffect(() => { //updates the user info in rightbar
    if (user?.username === currentUser.username) {
      setCity(currentUser?.city);
      setCourse(currentUser?.course);
      setStatus(currentUser?.relationship);
    }
    else {
      setCity(user?.city);
      setCourse(user?.course);
      setStatus(user?.relationship);   
    }
  }, [user, currentUser])
  
  const handleClick = async () => {//function that handles clicking of follow button
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
      setFollowed(!followed);
    }catch(err){
      console.log(err);
    }
    
  }

  // const handleProfile = () => {

  // }
  
  //rightbar will differ based off what page you are on
  const HomeRightBar = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const {user} = useContext(AuthContext);
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage && 
            currentChat?.members.includes(arrivalMessage.sender) && 
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(user.following.filter( (f) => users.some((u) => u.userId === f)));
        })
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try{
                const res = await axios.get("/conversations/" + user._id);
                setConversations(res.data); 
            } catch(err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try{
                const res = await axios.get("/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(member => member !== user._id)      
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId, 
            text: newMessage,
        });

        try{
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch(err) {
            console.log(err);
        }
    };


    return(
      <>
        <div className="birthdayContainer">
          <span className="birthdayText"></span>
        </div>
        <h4 className="rightbarTitle">Online friends</h4>
        <ul className="rightbarFriendList">
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                <ChatOnline onlineUsers = {onlineUsers} currentId = {user._id} setCurrentChat = {setCurrentChat}/>
            </div>
        </div>
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {
    const currentUser = useAuth();
    console.log(currentUser);
    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove/> : <Add/>}
        </button>
      )}
      {user.username === currentUser.username && <EditProfile/>}

      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Course:</span>
          {/* <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : "Taken"}</span> */}
          <span className="rightbarInfoValue">{course}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Status:</span>
          {/* <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : "Taken"}</span> */}
          <span className="rightbarInfoValue">{status}</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        {friends.map((friend) => (
          <Link to = {"/profile/" + friend.username} style={{textDecoration:"none"}}> 
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
