import "./closeFriend.css";


export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
        <img 
          className="sidebarFriendImg" 
          src = { user.profilePicture ? PF + user.profilePicture: PF + "noProfilePic.jpg"} 
          alt="" 
        />
        <span className="sidebarFriendName">{console.log(user)}</span>
    </li>
  )
}
