import axiosClient from "./axios";

export function isValid(workspaceId: number, payload) {
  return axiosClient.post(
    `workspaces/${workspaceId}/channels/is-valid`,
    payload,
    {
      cancelPreviousRequests: true,
    }
  );
}
export function list(workspaceId: number) {
  return axiosClient.get(`workspaces/${workspaceId}/channels`);
}

export function create(workspaceId: number, payload: Object) {
  return axiosClient.post(`workspaces/${workspaceId}/channels`, payload);
}

export function addMembers(
  workspaceId: number,
  channelId: number,
  payload: Object
) {
  return axiosClient.post(
    `workspaces/${workspaceId}/channels/${channelId}/members`,
    payload
  );
}
