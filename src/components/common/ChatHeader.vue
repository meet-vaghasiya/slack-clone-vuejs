<template>
    <div>
        <div class="flex items-center justify-between px-2 py-2 md:px-5">
            <div class="flex items-center mr-auto text-xl font-medium text-black cursor-pointer gap-x-1"
                @click="isInfoModalOpen = true">
                <CustomImage v-if="!isChannel" class="w-6 h-6 rounded-md" :src="profileData.src"
                    :alt="`profile photo of ${profileData.name}`" />
                <Icon :name="profileData.is_private ? 'lock' : 'hashtag-thick'" />
                <span>{{ profileData.name }}</span>
                <Icon name="chevron-down" role="button" />
            </div>
            <template v-if="isChannel">
                <CustomImage class="w-6 h-6" :src="profileData.members[0].avatar" alt="profile photoes" />
                <span class="ml-1 mr-3">{{ profileData.members.length }}</span>
            </template>
            <Icon name="add-note" role="button" />
        </div>
        <div class="flex items-center py-1 gap-x-2 border-y border-y-grey-disabled md:px-5">
            <Icon name="plus" />
            <p class="text-secondary">Add a bookmark</p>
        </div>

        <ChannelInfo v-if="isChannel" :profileData="profileData" v-model="isInfoModalOpen" :title="profileData.name" />

    </div>
</template>

<script setup lang="ts">
import CustomImage from './CustomImage.vue';
import Icon from './Icon.vue';
import ChannelInfo from './models/ChannelInfo.vue';
import { ref } from 'vue'

const { profileData } = defineProps({
    profileData: {
        type: String,
        required: true
    },
    isChannel: Boolean
})

const isInfoModalOpen = ref<boolean>(false)

</script>