<template>
    <div class="relative flex p-2 gap-x-3 group hover:bg-grey-light" @mouseenter="isVisible = true"
        @mouseleave="isVisible = false">
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
                class="absolute top-0 z-10 flex items-center px-3 py-2 -translate-y-1/2 bg-white rounded-md shadow-md right-10 ring-1 gap-x-3 ring-grey-disabled ">
                <li>
                    <icon role="button" class="text-content-secondary" name="add-emoji"
                        v-tooltip="'Find another reaction'" />
                </li>
                <li>
                    <icon role="button" class="text-content-secondary" name="reply" v-tooltip="'Forward message'" />
                </li>
                <li>
                    <icon role="button" class="text-content-secondary" name="bookmark" v-tooltip="'Save for later'" />
                </li>
                <li>
                    <icon role="button" class="text-content-secondary" name="three-dots-vertical"
                        v-tooltip="'More Action'" />
                </li>
            </ul>
        </TransitionRoot>
        <EmojiPicker :native="true" @select="onSelectEmoji" />

    </div>
</template>

<script setup lang="ts">
import CustomImage from './CustomImage.vue';
import { computed, ref } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'



const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})
const isVisible = ref(false)
const search = ref('')

const insert = (v) => {
    console.log(v, 'v')
}
function onSelectEmoji(emoji) {
    console.log(emoji)
}

const extractedTime = computed(() => {
    const dateObj = new Date(props.message.created_at)
    const hours = dateObj.getHours()
    const displayHour = String(dateObj.getHours()).padStart(2, '0')
    const mins = String(dateObj.getMinutes()).padStart(2, '0')
    const suffix = (hours / 12) < 1 ? 'AM' : 'PM'

    return `${displayHour}:${mins} ${suffix}`
})

</script>


