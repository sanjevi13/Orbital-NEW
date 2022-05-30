import "./post.css"
import {MoreVert} from "@mui/icons-material";
import { useState, useEffect } from "react";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { axiosInstance } from "../../config";

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length); 
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(() => { //action that occurs after you render the page
        const fetchUser = async () => { //async function can only be declared inside main function
          const res = await axiosInstance.get(`/users/?userID=${post.userID}`);
          setUser(res.data);
        }
        fetchUser();
      }, [post.userID]) //second argument lets you choose what variable change trigger the effect

    const likeHandler = () => {
        setLike(isLiked ? like - 1: like + 1); // argument given is the return value of the update function
        setIsLiked(!isLiked);
    }
    
    return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={"profile/" + user.username}>
                    <img src={user.profilePicture || PF + "person/duck.jpg"} 
                    alt="" className="postProfileImg" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img src={PF + post.img} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={PF + "like.png" }alt="" className="likeIcon" onClick={likeHandler}/>
                    <img src={PF + "heart.png"} alt="" className="likeIcon" onClick={likeHandler}/>
                    <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
