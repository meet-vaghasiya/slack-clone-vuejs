<template>
    <div class="flex gap-x-3">
        <CustomImage :src="props.message.member?.avatar" class="flex-shrink-0 w-10 h-10 rounded-md"
            :alt="`Avatar of ${props.message.member?.name}`" />
        <div>
            <div class="flex items-center gap-x-3">
                <span class="text-lg font-bold leading-none">{{ props.message.member?.name }}
                </span>
                <span class="text-sm leading-none text-content-secondary">{{ extractedTime }}
                </span>
            </div>
            <div>{{ props.message.content }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CustomImage from './CustomImage.vue';
import { computed } from 'vue'
const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})

const extractedTime = computed(() => {
    const dateObj = new Date(props.message.created_at)
    const hours = dateObj.getHours()
    const displayHour = String(dateObj.getHours()).padStart(2, '0')
    const mins = String(dateObj.getMinutes()).padStart(2, '0')
    const suffix = (hours / 12) < 1 ? 'AM' : 'PM'

    return `${displayHour}:${mins} ${suffix}`
})

</script>


