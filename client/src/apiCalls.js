import axios from "axios";  
import { axiosInstance } from "./config";
import { LoginStart, LoginFailure, LoginSuccess , LogOut, UpdateProfile} from "./context/AuthActions";

export const loginCall = async (userCredential, dispatch) => {
    dispatch(LoginStart()); 
    try {
        const res = await axios.post("/auth/login", userCredential);
        dispatch(LoginSuccess(res.data));
        return "success";
    } catch(err) {
        console.log(err);
        dispatch(LoginFailure(err));
        return err.response.data;
    }
}

export const logOut = (dispatch) => {
    dispatch(LogOut());
}

export const editProfile = (newDetails, dispatch) => { //newDetails is object containing the updated details
    dispatch(UpdateProfile(newDetails));
}