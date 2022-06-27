import "./login.css"
import {useContext, useRef} from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import {Link} from "react-router-dom";
export default function Login() {
    const email = useRef(); //reference to the jsx element
    const password = useRef();
    const context = useContext(AuthContext); 
    const {user, isFetching, error, dispatch} = useContext(AuthContext); 
    const [userErr, setUserErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();
        const res = await loginCall( //updates the context
        { 
            email: email.current.value, 
            password:password.current.value
        }, 
        dispatch);
        if (res === "wrong password"){
            setUserErr("");
            setPasswordErr("Wrong password");
        }
        else if(res === "user not found"){
            setPasswordErr("");
            setUserErr("User not found");
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
                    <input 
                        placeholder="Email" 
                        type="email" 
                        className="loginInput" 
                        ref={email}
                        required
                    />
                    <input 
                        placeholder="Password" 
                        type="password" 
                        className="loginInput" 
                        ref={password}
                        required
                    />
                    <div
                        className="userErr"
                        style={{
                            display: userErr? 'block': 'none'
                        }}
                    >
                    User not found
                    </div>
                    <div
                        className="passwordErr" 
                        style={{
                            display: passwordErr? 'block': 'none' 
                        }}
                    >
                    Password not found
                    </div>
                    <button 
                        className="loginButton" 
                        // type="submit"
                        disabled={isFetching}
                    >
                        {isFetching ? "loading" : "Log In" }
                    </button>
                    {/* <span className="loginForgot">Forgot password</span> */}
                    <Link to={"/register"} className="loginRegisterButtonLink">
                        <button className="loginRegisterButton">
                            Create new account
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
