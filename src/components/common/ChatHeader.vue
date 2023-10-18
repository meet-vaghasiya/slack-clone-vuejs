<template>
    <div>
        <div class="flex items-center justify-between px-2 py-2 md:px-5">
            <div class="flex items-center mr-auto text-xl font-medium text-black cursor-pointer gap-x-1">
                <CustomImage v-if="!isChannel" class="w-6 h-6 rounded-md" :src="profileData.src"
                    :alt="`profile photo of ${profileData.name}`" />
                <SvgContainer :filename="profileData.is_private ? 'Lock' : 'Hash'" />
                <span>{{ profileData.name }}</span>
                <SvgContainer filename="DownArrow" role="button" />
            </div>
            <template v-if="isChannel">
                <CustomImage class="w-6 h-6" :src="profileData.members[0].avatar" alt="profile photoes" />
                <span class="ml-1 mr-3">{{ profileData.members.length }}</span>
            </template>
            <SvgContainer filename="AddDoc" role="button" />
        </div>
        <div class="flex items-center py-1 gap-x-2 border-y border-y-grey-disabled md:px-5">
            <SvgContainer filename="Plus" />
            <p class="text-secondary">Add a bookmark</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import CustomImage from './CustomImage.vue';
import SvgContainer from './SvgContainer.vue';


const { profileData } = defineProps({
    profileData: {
        type: String,
        required: true
    },
    isChannel: Boolean
})

</script>