<template>
    <div class="p-2 text-white bg-brand text-opacity-70">
        <h2 class="text-lg text-white">Channels</h2>
        <ul class="mt-3">
            <li v-for="(channel) in channelsStore.channels" :key="channel.id">
                <RouterLink :to="{ name: 'ChannelMessage', params: { id: 3, channelId: channel.id } }"
                    exact-active-class="text-white rounded-md bg-link"
                    class="flex items-center px-2 py-1 my-1 overflow-hidden transition-all gap-x-2 hover:bg-link hover:text-white">
                    <Icon :name="channel.is_private ? 'lock' : 'hashtag-thick'" />
                    <button class=""> {{ channel.name }} </button>

                </RouterLink>
            </li>
        </ul>
        <button class="flex items-center mt-3 mb-5 gap-x-2" @click="isChannelModelOpen = true">
            <div class="p-1 bg-white rounded-md bg-opacity-20">
                <Icon name="plus" />
            </div>
            Add channels
        </button>
        <h2 class="text-lg text-white">Members</h2>
        <ul class="mt-3">
            <li v-for="(member, index) in membersStore.members" :key="member.id">
                <RouterLink :to="{ name: 'OneToOneMessage', params: { id: 3, receiverId: member.id } }"
                    exact-active-class="text-white rounded-md bg-link"
                    class="flex items-center px-2 py-1 my-1 overflow-hidden transition-all gap-x-2 hover:bg-link hover:text-white">
                    <CustomImage class="w-6 h-6 rounded-md 6" :src="member.avatar" />
                    <button class=""> {{ member.name }} </button>
                    <p class="inline-block px-1 ml-auto text-sm text-white rounded-sm bg-content-secondary"
                        v-if="member.id === userStore.member.id">me</p>
                </RouterLink>
            </li>
        </ul>
        <button class="flex items-center mt-3 mb-5 gap-x-2">
            <div class="p-1 bg-white rounded-md bg-opacity-20">
                <Icon name="plus" />
            </div>

            Add Members
        </button>
        <CreateChannel v-model="isChannelModelOpen">


        </CreateChannel>

    </div>
</template>

<script setup lang="ts">
import CustomImage from './common/CustomImage.vue';
import { useUserStore } from '../stores/user';
import Icon from '@/components/common/Icon.vue'
import CreateChannel from '@/components/common/models/CreateChannel.vue'
import { ref, onBeforeMount } from 'vue'
import { list as memberList } from "@/api/members"
import { list as channleList } from "@/api/channels"
import { useWorkspaceStore } from "@/stores/workspace";
import { useChannelsStore } from '../stores/channles';
import { useMembersStore } from '../stores/members';

const isChannelModelOpen = ref(false)

const userStore = useUserStore()
const workspaceStore = useWorkspaceStore();
const channelsStore = useChannelsStore();
const membersStore = useMembersStore();


onBeforeMount(async () => {
    try {
        const [membersData, channelsData] = await Promise.all([memberList(workspaceStore.id), channleList(workspaceStore.id)])
        membersStore.setMembers(membersData.data.data)
        channelsStore.setChannels(channelsData.data.data)
    } catch (error) {

        console.error({ error })
    }

})


</script>