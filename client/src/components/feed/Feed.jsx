import "./feed.css";
import Share from "../share/Share";
import Post from "../posts/Post";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {axiosInstance} from "../../config";
import { AuthContext } from "../../context/AuthContext";
import FriendResult from "../friendResult/FriendResult";

export default function Feed({username, searchQuery}) {
  
  const NormalFeed = ({username}) => { //normal feed 
    const [posts, setPosts] = useState([]); //variable that exists between rendering of component
    const {user} = useContext(AuthContext);
    
    useEffect(() => {
      const fetchPosts = async () => { 
        const res = username //if we are looking at another user
          ? await axios.get("/posts/profile/" + username) 
          : await axios.get("/posts/timeline/" + user._id);
          
          setPosts(res.data.sort((p1,p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          }));
      }
      fetchPosts();
    }, [username, user._id]) //second argument lets you choose what variable change trigger the effect
    
    return (
      <>
        {(!username || username === user.username) && <Share/>} 
        {posts.map((p) => (
          <Post key={p._id} post={p}/>
        ))}
      </>
    )
  }

  const SearchFeed = ({searchQuery}) => {
    const [users, setUsers] = useState([]);
    const {user: currentUser} = useContext(AuthContext);
    useEffect(() => {
      const getUsers = async () => { //get all users that match the search query
        const res = await axios.get("/users/search/" + searchQuery);
        const filtered_users = res.data.filter(user => user._id !== currentUser._id); //filter out currentUser
        setUsers(filtered_users);
      }
      getUsers();
    }, [])
    return (
      users?.map((user) => 
        <FriendResult key={user._id} user={user}/>
      )
    )
  }

  return (
      <div className="feed">
        <div className="feedWrapper">
          {!searchQuery ? <NormalFeed username={username}/> : <SearchFeed searchQuery={searchQuery}/>}
        </div>
      </div>
  )
}
