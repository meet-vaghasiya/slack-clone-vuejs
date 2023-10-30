<!-- ChatWindow.vue -->
<template>
    <div class="flex flex-col flex-1 ">
        <p v-if="loading"> Loading</p>
        <template v-else>
            <ChatHeader :profile-data="receiverData" />
            <div class="flex flex-col flex-1 p-2 overflow-y-auto md:p-5">
                <ChatWindow class="flex-1" v-if="messages && messages.length" v-bind="{ messages }" />
                <p v-else class="flex-1 "> No message Yet</p>
                <CustomQuill placeholder="Message" @keydown.enter.prevent="!sending && sendMessage($event)"
                    :processing="sending" v-model="message" />
                <!-- todo: modify design and send button -->

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
import { useApi } from "@hooks/useApi"
import { useMultipleApi } from '../hooks/useApi';
import CustomQuill from '@/components/common/Quill.vue'


const route = useRoute();
const isChannel = route.params.userOrChat === 'channel'
const { messages, addMessage } = usePusher(`private-user.${route.params.receiverId}`, 'App\\Events\\MessageEvent');
const message = ref<string>('')
const receiverData = ref(null)
const userStore = useUserStore()

const apiDataArray = [
    { fn: show, params: [route.params.id, route.params.receiverId] },
    { fn: list, params: [route.params.id, route.params.receiverId] },
];
const props = defineProps({
    workspaceId: [String, Number]
})

const { loading } = useMultipleApi(apiDataArray, (err, data) => {
    if (!err) {
        const [recData, messageData] = data
        receiverData.value = recData
        messageData.forEach((newMessage) => {
            addMessage({ message: newMessage });
        })
    }
})
const sending = ref(false)
const sendMessage = async (e) => {
    sending.value = true
    const { loading } = useApi(create, [{
        content: message.value,
        receiver_id: route.params.receiverId,
    }, route.params.id], (err, data) => {

        if (!err) {
            addMessage({ message: data })
            message.value = ''

        }
        sending.value = false
    })

}


</script>
