import axiosClient from "./axios";

export function isEmailExist(payload: Object) {
  return axiosClient.post("/is-email-exist", payload, {
    cancelPreviousRequests: true,
  });
}
