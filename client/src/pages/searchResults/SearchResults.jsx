//use context to get list of friends
//map each friend to a friendResult component
import "./searchResults.css";
import Topbar from "../../components/topbar/Topbar";
import FriendResult from "../../components/friendResult/FriendResult";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";

//return list of all users inside the database excluding the current user
export default function SearchResults() {
    const query = useParams().query;
    // const {user} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    useEffect(() => {
      const getUsers = async () => {
        //get all users that match the search query
        const res = await axios.get("/users/search/" + query);
        console.log(res);
        setUsers(res.data);
      }
      getUsers();
    }, [])
    return ( 
      <>
        <Topbar/>
        <div>{users?.map((user) => <FriendResult key={user._id} user={user}/>)}</div>
      </>
    )
}

