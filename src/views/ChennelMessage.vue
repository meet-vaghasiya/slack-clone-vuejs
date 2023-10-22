<!-- ChatWindow.vue -->
<template>
    <div class="flex flex-col flex-1">
        <p v-if="isLoading"> Loading</p>
        <template v-else>
            <ChatHeader :profile-data="channelData" is-channel />

            <div class="flex flex-col flex-1 p-2 overflow-y-auto md:p-5">
                <ChatWindow v-if="messages.length" v-bind="{ messages }" class="flex-1" />
                <p v-else class="flex-1"> No message Yet</p>
                <ValidateInput :input-attrs="{ placeholder: 'Message' }" v-model="message" icon-suffix="send-fill"
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
import { create, list } from '../api/channel-messages';
import { useUserStore } from '../stores/user';
import { useRoute } from "vue-router";
import ChatHeader from '@common/ChatHeader.vue';
import { show } from '../api/channels';


const route = useRoute();
const { messages, addMessage } = usePusher(`private-chat.${route.params.channelId}`, 'App\\Events\\ChatEvent');
const message = ref<string>('')

const userStore = useUserStore()
const isLoading = ref(true)
const channelData = ref(null)
const getChannelInfo = async () => {
    try {
        const { data } = await show(route.params.id, route.params.channelId)
        channelData.value = data.data

    } catch (error) {
        console.error({ error })
    }
}
getChannelInfo()

const getAllMessages = async () => {

    try {
        const { data } = await list(route.params.id, route.params.channelId)
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
        }, route.params.id, route.params.channelId)
        addMessage({ message: data.data })
        message.value = ''
    } catch (e) {
        console.error('Error', e)
    }

}

</script>
