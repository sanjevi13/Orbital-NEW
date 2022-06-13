import "./login.css"
import {useContext, useRef} from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
    const email = useRef(); //reference to the jsx element
    const password = useRef();
    const context = useContext(AuthContext); 
    const {user, isFetching, error, dispatch} = useContext(AuthContext); 
    
    const handleClick = async (e) => {
        e.preventDefault();
        await loginCall( //updates the context
        { 
            email: email.current.value, 
            password:password.current.value
        }, 
        dispatch);
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
                    <input placeholder="Email" 
                    type="email" 
                    className="loginInput" 
                    ref={email}
                    required/>
                    <input 
                    placeholder="Password" 
                    type="password" 
                    className="loginInput" 
                    ref={password}
                    required
                    />
                    <button className="loginButton" 
                    type="submit"
                    disabled={isFetching}>
                    {isFetching ? "loading" : "Log In" }
                    </button>
                    <span className="loginForgot">Forgot password</span>
                    <button className="loginRegisterButton">Create new account</button>
                </form>
            </div>
        </div>
    </div>
  )
}
