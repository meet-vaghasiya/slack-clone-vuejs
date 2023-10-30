<template>
    <div class="flex flex-col gap-y-5">
        <div class="flex items-center gap-x-2">
            <CustomImage class="w-10 h-10" :src="null" alt="Member image" />
            <span class="text-lg font-medium">Add people</span>
        </div>
        <div class="flex items-center gap-x-2" v-for="(member) in memberInfo" :key="member.id">
            <CustomImage class="w-10 h-10" :src="member.avatar" alt="member info" />
            <span class="text-lg font-medium">{{ member.name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import CustomImage from '../common/CustomImage.vue';


const { memberInfo } = defineProps({
    memberInfo: {
        type: Object,
        required: true
    }
})

</script>