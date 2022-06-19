import "./topbar.css";
import {Search, Person, Chat, Notifications} from '@mui/icons-material';
import {Link, useHistory} from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import {logOut} from "../../apiCalls";
function Topbar() {
    const {user, dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const searchInput = useRef();
    const history = useHistory();

    const handleLogOut = () => {
        logOut(dispatch); //update context to set user to null
        window.location.reload(); //refresh page
    }

    const handleSearch = () => {
        history.push("/search/" + searchInput.current.value)
    }
    return (
        <div className="topbarContainer">
            <div className="topbarLeft"> 
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">NUSConnect</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                <Search className="searchIcon"/>
                    <form onSubmit={handleSearch}>            
                        <input 
                            className="searchInput"
                            placeholder="Search for friends, posts or video"  
                            ref={searchInput}
                        />
                    </form>          
                </div>
            </div>

            <div className="topbarRight">
                <div className="topbarLinks">
                    {/* <span className="topbarLink">Home</span> */}
                    {/* <span className="topbarLink">Timeline</span> */}
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">8</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">3</span>
                    </div>
                </div>
                <div 
                    className="logOutButton"
                    onClick={handleLogOut}
                >Logout</div>
                <Link to={"/profile/"+ user.username}>
                    <img 
                        src={
                        user.profilePicture 
                            ? PF + user.profilePicture
                            : PF + "noProfilePic.jpg"
                        } 
                        alt="" className="topbarImg" 
                    />
                </Link>
            </div>
        </div>
    );
}

export default Topbar;