import axios from "axios";  
import { axiosInstance } from "./config";
import { LoginStart, LoginFailure, LoginSuccess } from "./context/AuthActions";
export const loginCall = async (userCredential, dispatch) => {
    dispatch(LoginStart()); 
    try {
        const res = await axios.post("/auth/login", userCredential);
        console.log(LoginSuccess(res.data));
        dispatch(LoginSuccess(res.data));
    } catch(err) {
        dispatch(LoginFailure(err));
    }
}