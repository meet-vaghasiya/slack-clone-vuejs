// src/api/axios.ts
import axios from "axios";
// import { useUserStore } from "@/stores/user";

// const authStore = useUserStore();

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosClient.interceptors.response.use(
  function (response) {
    // console.log("response");
    return response;
  },
  function (error) {
    // let res = error.response;
    // console.error("errror");
    // return Promise.reject(error);
  }
);

// axiosInstance.interceptors.request.use((config) => {
//   if (authStore.isAuthenticated) {
//     config.headers["Authorization"] = `Bearer ${authStore.token}`;
//   }
//   return config;
// });

export default axiosClient;
