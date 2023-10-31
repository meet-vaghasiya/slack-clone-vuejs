<template>
    <div class="flex gap-x-3 relative group" @mouseenter="isVisible = true" @mouseleave="isVisible = false">
        <CustomImage :src="props.message.member?.avatar" class="flex-shrink-0 w-10 h-10 rounded-md"
            :alt="`Avatar of ${props.message.member?.name}`" />
        <div>
            <div class="flex items-center gap-x-3">
                <span class="text-lg font-bold leading-none">{{ props.message.member?.name }}
                </span>
                <span class="text-sm leading-none text-content-secondary">{{ extractedTime }}
                </span>
            </div>
            <div v-html="props.message.content"></div>
        </div>
        <TransitionRoot :show="isVisible" enter="transition-opacity duration-75" enter-from="opacity-0"
            enter-to="opacity-100" leave="transition-opacity duration-150" leave-from="opacity-100" leave-to="opacity-0">
            <ul
                class="absolute  flex right-10 top-0 -translate-y-1/2 shadow-md ring-1  gap-x-2 items-center ring-grey-disabled px-2 py-2 rounded-md ">
                <li>
                    <icon class="text-content-secondary" name="add-emoji" />
                </li>
                <li>
                    <icon class="text-content-secondary" name="reply" />
                </li>
                <li>
                    <icon class="text-content-secondary" name="bookmark" />
                </li>
                <li>
                    <icon class="text-content-secondary" name="three-dots-vertical" />
                </li>
            </ul>
        </TransitionRoot>

    </div>
</template>

<script setup lang="ts">
import CustomImage from './CustomImage.vue';
import { computed, ref } from 'vue'
import { TransitionRoot } from '@headlessui/vue'

const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})
const isVisible = ref(false)

const extractedTime = computed(() => {
    const dateObj = new Date(props.message.created_at)
    const hours = dateObj.getHours()
    const displayHour = String(dateObj.getHours()).padStart(2, '0')
    const mins = String(dateObj.getMinutes()).padStart(2, '0')
    const suffix = (hours / 12) < 1 ? 'AM' : 'PM'

    return `${displayHour}:${mins} ${suffix}`
})

</script>


