import axiosInstance from "./https";

export const registerUser = (values) => {
  return axiosInstance.post("/register", values);
};
export const loginUser = (values) => {
  return axiosInstance.post("/login", values);
};
