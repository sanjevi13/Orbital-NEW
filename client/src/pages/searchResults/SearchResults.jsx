//use context to get list of friends
//map each friend to a friendResult component
import "./searchResults.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import FriendResult from "../../components/friendResult/FriendResult";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";

//return list of all users inside the database excluding the current user
export default function SearchResults() {
    const query = useParams().query;
    return ( 
      <>
        <Topbar/>
        <div className="searchResultContainer">
          <Sidebar/>
          <Feed searchQuery = {query}/>
          <Rightbar/> 
        </div>
      </>
    )
}

