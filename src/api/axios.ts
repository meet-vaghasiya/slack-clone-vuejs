// src/api/axios.ts
import axios from "axios";
// import { useUserStore } from "@/stores/user";

// const authStore = useUserStore();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8000/api",
});

// axiosInstance.interceptors.request.use((config) => {
//   if (authStore.isAuthenticated) {
//     config.headers["Authorization"] = `Bearer ${authStore.token}`;
//   }
//   return config;
// });

export default axiosInstance;
