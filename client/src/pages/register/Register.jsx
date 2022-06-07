import "./register.css";
import {useRef} from "react";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config";


export default function Register() {
    const username = useRef(); //reference to the jsx element
    const email = useRef(); 
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();
    
    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("Passwords don't match")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                const res = await axios.post("/auth/register", user);     
                history.push("/login");        
            } catch(err){
                console.log(err);
            }
        }
    }
    
    return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">NUSConnect</h3>
                <span className="loginDesc">
                    Connect with NUS
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Username" ref={username} required className="loginInput" />
                    <input placeholder="Email" 
                    ref={email} 
                    required 
                    className="loginInput" 
                    type="email"
                    />
                    <input placeholder="Password" 
                    ref={password} 
                    required 
                    className="loginInput" 
                    type="password"
                    />
                    <input 
                    placeholder="Password again" 
                    ref={passwordAgain} 
                    required 
                    className="loginInput" 
                    type="password"
                    />
                    <button className="loginButton" type="submit">Sign up</button>
                    <Link to={"/login"} >
                        <button className="loginRegisterButton">Log into your account</button>
                    </Link>                
                    
                </form>
            </div>
        </div>
    </div>
  )
}