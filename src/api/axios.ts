// src/api/axios.ts
import axios, { AxiosResponse } from "axios";
import pusher from "../pusher.config";
import { useUserStore } from "@/stores/user";
const pendingRequests: { [key: string]: AbortController } = {};

const removePendingRequest = (url: string | undefined, abort = false): void => {
  // check if pendingRequests contains our request URL
  if (url && pendingRequests[url]) {
    // if we want to abort ongoing call, abort it
    if (abort) {
      pendingRequests[url].abort();
    }
    // remove the request URL from pending requests
    delete pendingRequests[url];
  }
};

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosClient.interceptors.response.use((response: AxiosResponse) => {
  removePendingRequest(response.request.responseURL);
  return response;
});

axiosClient.interceptors.request.use((config) => {
  const userStore = useUserStore(); // Replace with your actual store import

  // set token
  if (userStore.token) {
    // Add the bearer token to the request headers
    config.headers.Authorization = `Bearer ${userStore.token}`;
  }

  // cancel token
  if (config?.cancelPreviousRequests && config?.url && !config.signal) {
    removePendingRequest(config.url, true);

    const abortController = new AbortController(); //create new AbortController
    config.signal = abortController.signal; // assign it's signal into request config
    pendingRequests[config.url] = abortController; // store AbortController in the pending requests map
  }

  if (pusher.connection) {
    config.headers["X-Socket-ID"] = pusher.connection.socket_id;
  }

  return config;
});

export default axiosClient;
