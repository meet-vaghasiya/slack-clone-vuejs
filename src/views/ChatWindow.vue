<!-- ChatWindow.vue -->
<template>
    <div class="chat-window">
        <h2>Chat</h2>
        <ul>
            <li v-for="message in messages" :key="message.id">
                <strong>{{ message.sender }}:</strong> {{ message.text }}
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    name: 'ChatWindow',
    props: {
        messages: Array, // List of chat messages
    },
    // Add any component-specific logic here
};
</script>
  