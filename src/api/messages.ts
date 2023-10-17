import axiosClient from "./axios";

export function create(payload: Object, workspaceId: string) {
  return axiosClient.post(`/workspaces/${workspaceId}/messages`, payload);
}

export function list(workspaceId: string, receiverId: string) {
  return axiosClient.get(`/workspaces/${workspaceId}/messages/${receiverId}`);
}
