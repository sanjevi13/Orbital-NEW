import "./feed.css";
import Share from "../share/Share";
import Post from "../posts/Post";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {axiosInstance} from "../../config";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username}) {
  const [posts, setPosts] = useState([]); //variable that exists between rendering of component
  const {user} = useContext(AuthContext);
  
  useEffect(() => { //action that occurs after you render the page
    const fetchPosts = async () => { //async function can only be declared inside main function
      const res = username 
        ? await axios.get("/posts/profile/" + username) 
        : await axios.get("/posts/timeline/" + user._id);
        
        setPosts(res.data.sort((p1,p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
    }
    fetchPosts();
  }, [username, user._id]) //second argument lets you choose what variable change trigger the effect
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share/>}
        {posts.map((p) => (
          <Post key={p._id} post={p}/>
        ))}
      </div>
    </div>
  )
}
