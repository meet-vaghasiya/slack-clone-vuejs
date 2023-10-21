// src/api/axios.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import pusher from "../pusher.config";
import { useUserStore } from "@/stores/user";
const pendingRequests: Map<string, AbortController> = new Map();

// Create an AbortController for a specific URL and store it in pendingRequests
function createAbortController(url: string): AbortController {
  const abortController = new AbortController();
  pendingRequests.set(url, abortController);
  return abortController;
}

// Remove a pending request and abort it if necessary
function removePendingRequest(url: string): void {
  if (pendingRequests.has(url)) {
    const abortController = pendingRequests.get(url);
    abortController?.abort();
    pendingRequests.delete(url);
  }
}

function setAuthorizationHeader(config: AxiosRequestConfig): void {
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`;
  }
}

// Handle request cancellation and include Pusher socket ID if connected
function handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  if (config.cancelPreviousRequests && config.url && !config.signal) {
    removePendingRequest(config.url);
    config.signal = createAbortController(config.url).signal;
  }

  if (pusher.connection) {
    config.headers["X-Socket-ID"] = pusher.connection.socket_id;
  }

  return config;
}

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Axios response interceptor to remove completed requests from the pending list
axiosClient.interceptors.response.use((response: AxiosResponse) => {
  removePendingRequest(response.config.url);
  return response;
});

// Axios request interceptor to set headers and handle request cancellation
axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    setAuthorizationHeader(config);
    return handleRequest(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
