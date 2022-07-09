import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar"
import { useState, useEffect } from "react";
import axios from "axios"; 
import { useParams } from "react-router";
import { axiosInstance } from "../../config";
import {memo} from 'react';

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() => { //action that occurs after you render the page
        const fetchUser = async () => { //async function can only be declared inside main function
            const res = await axios.get(`/users/?username=${username}`);
            // console.log(res);
            setUser(res.data); //update the state and re-render the page
        }
        fetchUser();
      }, [username]) //second argument lets you choose what variable change trigger the effect

    return (
    <>
    <Topbar/>
    <div className="profile">
        <Sidebar/>
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img src= {user.coverPicture ? PF + user.coverPicture : PF + "noCover.jpg"} alt="" className="profileCoverImg" />
                    <img src= {user.profilePicture ? PF + user.coverPicture : PF + "noProfilePic.jpg"} alt="" className="profileUserImg" />
                </div>
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
            <div className="profileRightBottom">
                <Feed username={username}/>
                {Object.keys(user).length !== 0 ? <Rightbar user={user}/>: null} 
            </div>
        </div> 
    </div>   
    </>
    )
}

