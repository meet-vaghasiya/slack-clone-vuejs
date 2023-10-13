<template>
    <TransitionRoot :show="props.modelValue" as="template" enter="duration-300 ease-out" enter-from="opacity-0"
        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-50" />
            </TransitionChild>
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-full p-4 text-center">

                    <DialogPanel
                        class="w-full max-w-lg p-5 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                        <DialogTitle as="h3"
                            class="flex items-center justify-between text-2xl font-medium font-bold leading-6 text-gray-900">
                            <slot name="title" />
                            <SvgContainer role="button" class="btn" filename="Close" @click="closeModal" />
                        </DialogTitle>
                        <div class="mt-5">
                            <slot name="body" />
                        </div>
                        <div class="flex mt-10 ml-auto">
                            <slot name="footer">
                                <button type="button"
                                    class="inline-flex justify-center px-4 py-2 ml-auto text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="$emit('on:click', $event)">
                                    Next
                                </button>
                            </slot>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'


const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
})
const emit = defineEmits()
console.log(props.modelValue, 'props');

function closeModal() {
    console.log('close is calling')
    emit('update:modelValue', false)
}
function openModal() {
    emit('update:modelValue', true)
}
</script>
  