<template>
    <button class="flex items-center justify-center gap-x-2 min-w-[100px]"
        :class="[btnClasses, { 'pointer-events-none': disabled || loading, '!p-2': icon }]">
        <SvgContainer v-if="prependIcon" :filename="prependIcon" />

        <CustomLoader v-if="loading" type="Circular" />
        <slot v-else />
        <SvgContainer v-if="icon" :filename="icon" />
        <SvgContainer v-if="appendIcon" :filename="appendIcon" />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SvgContainer from './SvgContainer.vue';
import CustomLoader from './CustomLoader.vue';

const textClassMap = {
    blue: 'text-blue',
    green: 'text-green',
    error: 'text-error',
    secondary: 'text-secondary',
    brand: 'text-brand'
}
const bgClassMap = {
    blue: 'bg-blue',
    green: 'bg-green',
    error: 'bg-error',
    secondary: 'bg-secondary',
    brand: 'bg-brand'
}
const borderRadiusMap = {
    sm: 'border-sm',
    md: 'border-md',
    lg: 'border-lg',
    xl: 'border-xl',
    full: 'border-full'
}

const props = defineProps({
    appendIcon: {
        type: String,
        default: ''
    },
    disabled: Boolean,
    flat: Boolean,
    outline: Boolean,
    icon: String,
    loading: Boolean,
    prependIcon: {
        type: String,
        default: ''
    },
    rounded: {
        type: String,
        default: 'sm'
    },
    text: Boolean,
    variant: {
        type: String,
        default: 'blue',
        validator(value: string) {
            return ['blue', 'green', 'error', 'secondary', 'brand'].includes(value)
        }
    }

})

const btnClasses = computed(() => {
    let textColor = 'text-white';
    let bgColor = 'bg-transparent';
    let borderColor = '';
    let boxShadow = ''

    if (props.text || props.outline) {
        console.log('hello')
        textColor = props.disabled ? 'text-grey-disabled' : `${textClassMap[props.variant]} hover:text-opacity-80`
    } else {
        bgColor = props.disabled ? 'bg-grey-disabled' : `${bgClassMap[props.variant]} hover:bg-opacity-80`
    }

    if (props.outline) {
        borderColor = `border ${borderRadiusMap[props.variant]} hover:text-opacity-70`
    }

    if (!props.flat && !props.text) {
        boxShadow = `shadow-md`
    }

    return `py-2 px-3 rounded-${props.rounded} ${textColor} ${bgColor} ${borderColor} ${boxShadow}`
})

</script>