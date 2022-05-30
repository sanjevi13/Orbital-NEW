import "./feed.css";
import Share from "../share/Share";
import Post from "../posts/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import {axiosInstance} from "../../config";

export default function Feed({username}) {
  const [posts, setPosts] = useState([]); //variable that exists between rendering of component

  useEffect(() => { //action that occurs after you render the page
    const fetchPosts = async () => { //async function can only be declared inside main function
      const res = username 
        ? await axios.get("/api/posts/profile/" + username) 
        : await axios.get("/api/posts/timeline/6289a182bde074f423029748");
        setPosts(res.data);
    }
    fetchPosts();
  }, [username]) //second argument lets you choose what variable change trigger the effect
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        {posts.map((p) => (
          <Post key={p._id} post={p}/>
        ))}
      </div>
    </div>
  )
}
