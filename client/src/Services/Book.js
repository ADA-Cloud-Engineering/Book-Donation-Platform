import axiosInstance from "./https";

export const getAllBooks = () => {
  return axiosInstance.get(`/list`);
};
export const uploadBook = (values) => {
  return axiosInstance.post(`/upload`, values);
};
