<template>
    <div class="flex flex-col h-screen overflow-hidden">
        <Header />
        <div class="flex flex-1 main-container">
            <Sidebar v-bind="{ members, channels }" class="w-64" />
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue';
import { useWorkspaceStore } from "@/stores/workspace";
import { useChannelsStore } from "@/stores/channles";
import { list as memberList } from "@/api/members"
import { list as channleList } from "@/api/channels"
const workspaceStore = useWorkspaceStore();
const channelsStore = useChannelsStore();
import { ref, onBeforeMount } from 'vue'

const members = ref([])
onBeforeMount(async () => {
    try {
        const [membersData, channelsData] = await Promise.all([memberList(workspaceStore.id), channleList(workspaceStore.id)])
        members.value = membersData.data.data
        channelsStore.setChannels(channelsData.data.data)
    } catch (error) {

        console.error({ error })
    }

})
</script>

<style scoped>
.main-container {
    max-height: calc(100vh - 48px);
}
</style>