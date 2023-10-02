<template>
    <div class="p-2 text-white bg-brand text-opacity-70">
        <h2 class="text-lg text-white">Members</h2>
        <ul class="mt-4">
            <li v-for="(member, index) in props.members" :key="member.id">
                <RouterLink :to="{ name: 'ChatWindow', params: { id: 3, memberId: member.id } }"
                    exact-active-class="text-white rounded-md bg-link"
                    class="flex px-2 py-1 my-1 overflow-hidden transition-all gap-x-2 hover:bg-link hover:text-white">
                    <CustomImage class="w-8 h-8 rounded-md" :src="member.avatar" />
                    <button class=""> {{ member.name }} </button>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import CustomImage from './common/CustomImage.vue';

import { defineProps } from 'vue'
const props = defineProps({
    members: {
        type: Array,
        required: false,
        default: () => []

    }
})

</script>