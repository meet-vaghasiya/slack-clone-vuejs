import axiosClient from "./axios";

export function create(payload: Object) {
  return axiosClient.post("/workspaces", payload, {
    cancelPreviousRequests: true,
  });
}
