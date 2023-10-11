import axiosClient from "./axios";

export function create(payload: Object, workspaceId: string) {
  console.log("calling");
  return axiosClient.post(`/workspaces/${workspaceId}/messages`, payload);
}

export function list(workspaceId: string, receiverId: string) {
  console.log("calling");
  return axiosClient.get(`/workspaces/${workspaceId}/messages/${receiverId}`);
}
