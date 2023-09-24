<template>
    <div class="flex items-center justify-center w-16 h-16 p-4 border rounded-xl border-link" v-for="(digit, index) in otp"
        :key="index">
        <input ref="otpFieldsRef" class="w-full text-3xl text-center outline-none" v-model="otp[index]"
            @input="handleInput(index)" @paste="handlePaste" @keydown="handleKeyDown(index, $event)" maxlength="1" />
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps } from 'vue';

const props = defineProps({
    length: {
        type: Number,
        default: 6,
    },
});
const emit = defineEmits();

const otp = ref<string[]>(Array(props.length).fill(''));
const otpFieldsRef = ref<HTMLElement[]>([]);

const handleInput = (index: number) => {
    if (otp.value[index] !== '') {
        if (index < props.length - 1) {
            const nextIndex = index + 1;
            const nextField = otpFieldsRef.value?.[nextIndex] as HTMLInputElement;
            nextField?.focus();
        }
    }
    emit('input', otp.value.join(''));
};

const handleKeyDown = (index: number, event: KeyboardEvent) => {
    if (event.key === 'Backspace' && index > 0 && otp.value[index] === '') {
        const prevIndex = index - 1;
        const prevField = otpFieldsRef.value?.[prevIndex] as HTMLInputElement;
        prevField?.focus();
    }
};

const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text') || '';
    const pasteData = clipboardData.slice(0, props.length);
    for (let i = 0; i < props.length; i++) {
        otp.value[i] = pasteData[i] || '';
    }
    emit('update:modelValue', otp.value.join(''));
};

onMounted(() => {
    const firstField = otpFieldsRef.value?.[0] as HTMLInputElement;
    firstField?.focus();
});
</script>
  
<style scoped>
/* Add your CSS styling here, if needed */
</style>
  