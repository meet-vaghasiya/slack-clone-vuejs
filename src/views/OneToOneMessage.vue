<!-- ChatWindow.vue -->
<template>
    <div class="flex flex-col flex-1 ">
        <p v-if="isLoading"> Loading</p>
        <template v-else>
            <ChatHeader :profile-data="receiverData" />
            <div class="flex flex-col flex-1 p-2 overflow-y-auto md:p-5">
                <ChatWindow class="flex-1" v-if="messages.length" v-bind="{ messages }" />
                <p v-else class="flex-1 "> No message Yet</p>
                <ValidateInput :input-attrs="{ placeholder: 'Message' }" v-model="message" icon-suffix="SentMessageArrow"
                    @click:suffix="sendMessage" @keydown.enter.prevent="sendMessage" />
            </div>
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
import { show } from '../api/members';
import ChatHeader from '@common/ChatHeader.vue';


const route = useRoute();
const isChannel = route.params.userOrChat === 'channel'
console.log(isChannel, 'ischannge')
const { messages, addMessage } = usePusher(`private-user.${route.params.receiverId}`, 'App\\Events\\MessageEvent');
const message = ref<string>('')

const userStore = useUserStore()
const isLoading = ref(true)
const receiverData = ref(null)
const getUserInfo = async () => {
    try {
        const { data } = await show(route.params.id, route.params.receiverId)
        receiverData.value = data.data

    } catch (error) {

    }
}
getUserInfo()
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
