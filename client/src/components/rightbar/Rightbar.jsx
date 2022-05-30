import "./rightbar.css"
import {Users} from "../../dummyData";
import Online from "../online/Online";
export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //rightbar will differ based off what page you are on
  const HomeRightBar = () => {
    return(
      <>
        <div className="birthdayContainer">
          {/* <img src="assets/gift.png" alt="" className="birthdayImg" /> */}
          <span className="birthdayText"></span>
            {/* <b>Mike</b> and <b>3 other friends</b> have birthday today</span> */}
        </div>
        {/* <img src="assets/ad.png" alt="" className="rightbarAd" /> */}
        <h4 className="rightbarTitle">Online friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(user => (
            <Online key={user.id} user={user}/>
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {
    return (
      <>
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          {/* <span className="rightbarInfoValue">{user.city}</span> */}
          <span className="rightbarInfoValue">Singapore</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Course:</span>
          {/* <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : "Taken"}</span> */}
          <span className="rightbarInfoValue">Computer Science</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Status:</span>
          {/* <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : "Taken"}</span> */}
          <span className="rightbarInfoValue">Single</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img src={PF + "person/duck.jpg"} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Glen Lim</span>
        </div>
        <div className="rightbarFollowing">
          <img src={PF + "person/shrek.png"} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Jev Ravi</span>
        </div>
        <div className="rightbarFollowing">
          <img src={PF + "person/cat.jpg"} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Alan Ng</span>
        </div>
      </div>
      </>
    )
  }
  
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar/>: <HomeRightBar/>}
      </div>
    </div>
  )
}
