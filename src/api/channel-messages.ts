import axiosClient from "./axios";

export function create(
  payload: Object,
  workspaceId: number,
  channelId: number
) {
  return axiosClient.post(
    `/workspaces/${workspaceId}/channels/${channelId}/messages`,
    payload
  );
}

export function list(workspaceId: string, channelId: string) {
  return axiosClient.get(
    `/workspaces/${workspaceId}/channels/${channelId}/messages`
  );
}
