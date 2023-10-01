import axiosClient from "./axios";

export function create(workspaceId: number, payload: Object) {
  return axiosClient.post(`workspaces/${workspaceId}/members`, payload);
}
