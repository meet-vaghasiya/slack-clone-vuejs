import axios from "axios";
import axiosClient from "./axios";

export function isEmailExist(payload: Object) {
  return axiosClient.post("/is-email-exist", payload, {
    cancelPreviousRequests: true,
  });
}
export function getAuthUser() {
  return axiosClient.get("http://localhost:8000/api/auth-user");
}
