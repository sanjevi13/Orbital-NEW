import "./post.css"
import {MoreVert} from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config";
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length); //control the number of likes
    const [isLiked, setIsLiked] = useState(false); //control how many times user can like a post
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useContext(AuthContext);
    
    useEffect(() => { //set the user for this post
        const fetchUser = async () => { //async function can only be declared inside main function
          const res = await axios.get(`/users/?userID=${post.userID}`);
          setUser(res.data);
        };
        fetchUser();
      }, [post.userID] //second argument lets you choose what variable change trigger the effect
    ) 

    useEffect(() => { //ensures that setIsLiked is updated to correct status after post is rendered
        setIsLiked(post.likes.includes(currentUser._id))
        }, 
        [currentUser._id, post.likes]
    )
    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userID: currentUser._id })
        } catch(err){

        }
        setLike(isLiked ? like - 1: like + 1); // argument given is the return value of the update function
        setIsLiked(!isLiked); 
    }
    
    return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={"profile/" + user.username}>
                    <img src={user.profilePicture ? 
                            PF + user.profilePicture : 
                            PF + "noProfilePic.jpg"
                        } 
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
