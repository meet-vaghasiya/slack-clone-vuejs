<template>
    <div class="flex flex-col h-screen">
        <Header />
        <div class="flex flex-1 h-full">
            <Sidebar class="w-64" />
            <ChatWindow class="flex-1" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue';
import ChatWindow from '@/components/ChatWindow.vue';
</script>
