import axios from "axios";
export const axiosInstance = axios.create({
    baseURL : "https://nusconnect.herokuapp.com/api/"
});