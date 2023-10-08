<!-- ChatWindow.vue -->
<template>
    <div class="chat-window">
        <h2>Chat</h2>
        <ul>
            <li v-for="(message, index) in messages" :key="index">
                <strong>{{ message }}</strong>
            </li>
        </ul>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { usePusher } from '../hooks/pusher';

const { messages, addMessage } = usePusher('private-chat');

// const sendMessage = () => {
//     // Logic to send a message
//     // For example, you can use a form input to enter and send a message
//     const message = 'New message from the user';
//     // Send the message to your backend and then Pusher will broadcast it to other clients
// };
</script>
