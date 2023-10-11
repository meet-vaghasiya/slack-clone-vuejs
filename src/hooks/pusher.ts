// pusherService.ts

import { ref, onMounted, onUnmounted } from "vue";
import pusher from "../pusher.config";

export function usePusher(channelName: string) {
  const channel = pusher.subscribe(channelName);
  const messages = ref<string[]>([]);

  const addMessage = (message: Object) => {
    console.log(message, "messagetesttest");
    messages.value.push(message.message);
  };

  onMounted(() => {
    channel.bind("App\\Events\\MessageEvent", addMessage);
  });

  onUnmounted(() => {
    channel.unbind("App\\Events\\MessageEvent", addMessage);
  });

  return { messages, addMessage };
}
