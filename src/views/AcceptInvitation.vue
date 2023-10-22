<template>
    Hello world
</template>

<script setup lang="ts">
import { verifyInvitation } from '@/api/members'
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount } from 'vue'

import { useUserStore } from '@/stores/user'
import { useWorkspaceStore } from '@/stores/workspace'

const route = useRoute()
const router = useRouter()
const workspaceStore = useWorkspaceStore()
const userStore = useUserStore()


const token = route.params.token
onBeforeMount(async () => {

    try {
        const { data } = await verifyInvitation(token)
        workspaceStore.setWorkspace(data.workspace)
        if (userStore.email !== data.user.email) {
            userStore.logout()
            userStore.setUserEmail(data.user.email)
            router.push({ name: 'Signin' })
        }

    } catch (error) {
        console.error(error, 'error')
    }


})


</script>