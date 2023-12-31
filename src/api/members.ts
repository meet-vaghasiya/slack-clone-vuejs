import axiosClient from "./axios";

export function list(workspaceId: number) {
  return axiosClient.get(`workspaces/${workspaceId}/members`);
}

export function create(workspaceId: number, payload: Object) {
  return axiosClient.post(`workspaces/${workspaceId}/members`, payload);
}

export function sendInvites(workspaceId: number, payload: Object) {
  return axiosClient.post(`workspaces/${workspaceId}/invites`, payload);
}

export function verifyInvitation(token: string) {
  return axiosClient.get(`/accept-invitation/${token}`);
}
