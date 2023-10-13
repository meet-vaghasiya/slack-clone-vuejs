<!-- ChatWindow.vue -->
<template>
    <div class="flex flex-col flex-1 p-2 md:p-5">
        <p v-if="isLoading"> Loading</p>
        <template v-else>
            <ChatWindow v-if="messages.length" v-bind="{ messages }" class="flex-1" />
            <p v-else> No message Yet</p>
            <ValidateInput :input-attrs="{ placeholder: 'Message' }" v-model="message" icon-suffix="SentMessageArrow"
                @click:suffix="sendMessage" @keydown.enter.prevent="sendMessage" />
        </template>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { usePusher } from '../hooks/pusher';
import ChatWindow from './ChatWindow.vue';
import ValidateInput from '../components/common/ValidateInput.vue';
import { create, list } from '../api/messages';
import { useUserStore } from '../stores/user';
import { useRoute } from "vue-router";


const route = useRoute();


const { messages, addMessage } = usePusher(`private-chat.${route.params.receiverId}`);
const message = ref<string>('')

const userStore = useUserStore()
const isLoading = ref(true)

const getAllMessages = async () => {

    try {
        const { data } = await list(route.params.id, route.params.receiverId)
        if (data && data.data && data.data.length > 0) {
            // Push new messages into the existing array
            data.data.forEach((newMessage) => {
                addMessage({ message: newMessage });
            });
        }
    } catch (error) {
        console.error(error, 'error message')
    } finally {
        isLoading.value = false
    }
}
getAllMessages()

const sendMessage = async (e) => {
    try {
        const { data } = await create({
            content: message.value,
            receiver_id: route.params.receiverId,
        }, route.params.id)
        addMessage({ message: data.data })
        message.value = ''
    } catch (e) {
        console.error('Error', e)
    }

}

</script>
