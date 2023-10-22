import axiosClient from "./axios";

export function isValid(workspaceId: number, payload) {
  console.log("hello world");
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
export function show(workspaceId: number, channelId: number) {
  return axiosClient.get(`workspaces/${workspaceId}/channels/${channelId}`);
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
