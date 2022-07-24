import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "http://localhost:5000/api"
    //set header to include "Access-Control-Allow-Origin" : "*"
    //https://stackoverflow.com/questions/45975135/access-control-origin-header-error-using-axios
});