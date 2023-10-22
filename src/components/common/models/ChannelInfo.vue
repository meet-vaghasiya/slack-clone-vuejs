<template>
    <TransitionRoot :show="modelValue" as="template" enter="duration-300 ease-out" enter-from="opacity-0"
        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-50" />
            </TransitionChild>
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-full p-4 text-center">

                    <DialogPanel
                        class="w-full max-w-lg overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                        <DialogTitle as="h3"
                            class="flex items-center justify-between p-4 text-2xl font-medium font-bold leading-6 text-gray-900">
                            {{ title }}
                            <Icon role="button" class="btn" name="close" @click="closeModal" />
                        </DialogTitle>

                        <div class="flex items-center px-5 gap-x-2">
                            <CustomBtn outline variant="secondary" class="w-8 h-8" icon="star" />
                            <CustomBtn outline variant="secondary" class="w-8 h-8">
                                Get notifications for all messages
                            </CustomBtn>
                            <CustomBtn outline variant="secondary" class="w-8 h-8">
                                Huddle
                            </CustomBtn>
                        </div>
                        <div class="flex px-5 mt-5 gap-x-5">
                            <div v-for="(title, index) in tabsTitle" class="font-semibold" role="button"
                                :class="{ 'border-b-2 border-b-content-primary': index === currentActiveTab }"
                                @click="currentActiveTab = index"> {{ title }}</div>
                        </div>
                        <div class="p-5 bg-grey-light">
                            <AboutChannelInfo :channelInfo="profileData" v-if="currentActiveTab == 0" />
                            <MemberChannelInfo :memberInfo="profileData.members" v-if="currentActiveTab == 1" />
                            <SettingChannelInfo v-if="currentActiveTab == 2" />
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'


import CustomBtn from '../CustomBtn.vue';
import { ref } from 'vue'
import AboutChannelInfo from '@/components/channel/AboutInfo.vue'
import MemberChannelInfo from '@/components/channel/MembersInfo.vue'
import SettingChannelInfo from '@/components/channel/SettingInfo.vue'

const { title, profileData, modelValue } = defineProps({
    title: {
        type: String,
        required: true
    },
    profileData: {
        type: Object,
        required: true
    },
    modelValue: {
        type: Boolean,
        required: true
    },
})

const tabsTitle = ['About', `Members ${profileData.members.length}`, 'Settings']
const currentActiveTab = ref(0)
const emit = defineEmits()

function closeModal() {
    emit('before:close')
    emit('update:modelValue', false)
    emit('after:close')
}
function openModal() {
    emit('update:modelValue', true)
}
</script>