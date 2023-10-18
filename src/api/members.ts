import axiosClient from "./axios";

export function list(workspaceId: number, query) {
  return axiosClient.get(`workspaces/${workspaceId}/members`, {
    params: query,
    cancelPreviousRequests: true,
  });
}

export function create(workspaceId: number, payload: Object) {
  return axiosClient.post(`workspaces/${workspaceId}/members`, payload);
}
export function show(workspaceId: number, memberId: number) {
  return axiosClient.get(`workspaces/${workspaceId}/members/${memberId}`);
}

export function sendInvites(workspaceId: number, payload: Object) {
  return axiosClient.post(`workspaces/${workspaceId}/invites`, payload);
}

export function verifyInvitation(token: string) {
  return axiosClient.get(`/accept-invitation/${token}`);
}
