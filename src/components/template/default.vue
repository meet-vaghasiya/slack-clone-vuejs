<template>
    <div class="flex flex-col h-screen overflow-hidden">
        <Header />
        <div class="flex flex-1 main-container">
            <Sidebar v-bind="{ members }" class="w-64" />
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue';
import { useWorkspaceStore } from "@/stores/workspace";
import { list as memberList } from "@/api/member"
const workspaceStore = useWorkspaceStore();
import { ref, onBeforeMount } from 'vue'

const members = ref([])
onBeforeMount(async () => {
    const { data } = await memberList(workspaceStore.id)
    members.value = data.data

})
</script>

<style scoped>
.main-container {
    max-height: calc(100vh - 48px);
}
</style>