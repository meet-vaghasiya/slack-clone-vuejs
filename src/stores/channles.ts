import { defineStore } from "pinia";
import { computed, ref, ComputedRef, Ref } from "vue";

type Channel = {
  id: number | null;
  name: string;
  is_private: boolean;
};

export const useChannelsStore = defineStore("channels", () => {
  const channels: Ref<Channel[]> = ref([]);

  const setChannels = (newChannels: Channel[]) => {
    channels.value = newChannels;
  };

  const addChannel = (newChannel: Channel) => {
    channels.value.push(newChannel);
  };

  return { channels, addChannel, setChannels };
});
