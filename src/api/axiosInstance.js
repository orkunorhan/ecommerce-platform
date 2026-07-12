import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthorizationToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = token;
};

export const clearAuthorizationToken = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

export default axiosInstance;
