// pusherService.ts

import { ref, onMounted, onUnmounted } from "vue";
import pusher from "../pusher.config";

export function usePusher(channelName: string) {
  const channel = pusher.subscribe("private-chat");
  const messages = ref<string[]>(["test first"]);

  const addMessage = (message: string) => {
    console.log(
      "========================================================================================================================="
    );
    messages.value.push(message);
  };

  onMounted(() => {
    console.log("mounteed called");
    channel.bind("App\\Events\\MessageEvent", addMessage);
  });

  onUnmounted(() => {
    channel.unbind("App\\Events\\MessageEvent", addMessage);
  });

  return { messages, addMessage };
}
