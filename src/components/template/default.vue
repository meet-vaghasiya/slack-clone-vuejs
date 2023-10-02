<template>
    <div class="flex flex-col h-screen">
        <Header />
        <div class="flex flex-1 h-full">
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