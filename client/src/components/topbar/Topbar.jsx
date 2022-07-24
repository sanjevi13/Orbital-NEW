import "./topbar.css";
import {Search, Person, Chat, Notifications} from '@mui/icons-material';
import {Link, useHistory} from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import {logOut} from "../../apiCalls";
import { logout, useAuth } from "../../firebase";
function Topbar() {
    const {user, dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const searchInput = useRef();
    const history = useHistory();
    const firebaseUser = useAuth();

    const handleLogOut = async () => {
        await logout();
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
                            placeholder="Search for friends"  
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
                    {/* <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">2</span>
                    </div> */}
                    <div className="topbarIconItem" onClick={() => history.push("/messenger")}>      
                        <Chat/>
                        {/* <span className="topbarIconBadge"></span> */}
                    </div>
                    {/* <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">3</span>
                    </div> */}
                </div>
                <div 
                    className="logOutButton"
                    onClick={handleLogOut}
                >Logout</div>
                <Link to={"/profile/"+ user.username}>
                    <img 
                    src={
                    firebaseUser?.photoURL
                        ? firebaseUser?.photoURL
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