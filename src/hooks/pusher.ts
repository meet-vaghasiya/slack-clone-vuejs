// pusherService.ts

import { ref, onMounted, onUnmounted } from "vue";
import pusher from "../pusher.config";

export function usePusher(channelName: string, eventName) {
  const channel = pusher.subscribe(channelName);
  const messages = ref<string[]>([]);

  const addMessage = (message: Object) => {
    messages.value.push(message.message);
  };

  onMounted(() => {
    channel.bind(eventName, addMessage);
  });

  onUnmounted(() => {
    channel.unbind(eventName, addMessage);
  });

  return { messages, addMessage };
}
