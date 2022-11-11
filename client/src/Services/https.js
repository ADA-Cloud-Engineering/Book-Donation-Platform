import Axios from "axios";
import axios from "axios";
export const baseURL = "https://bookcontribution.herokuapp.com/";
let token = localStorage.getItem("user_token");
const axiosInstance = Axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  },
  // withCredentials: true,
  // credentials: "include",
});
export default axiosInstance;
export const uploadInstance = axios.create({
  baseURL: baseURL,
});
