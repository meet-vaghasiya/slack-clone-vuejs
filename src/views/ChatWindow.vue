<!-- ChatWindow.vue -->
<template>
    <div class="overflow-y-auto chat-window" ref="scrollContainer">
        <ul class="flex flex-col gap-y-2">
            <li v-for="(message, index) in props.messages" :key="index">
                <MessageBox v-bind="{ message }" />
            </li>
        </ul>
    </div>
</template>
  
<script setup lang="ts">
import MessageBox from '../components/common/MessageBox.vue';
import { onMounted, ref } from 'vue';
const props = defineProps({
    messages: {
        type: Array,
        required: true
    }
})

const scrollContainer = ref(null)

onMounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
})

</script>
