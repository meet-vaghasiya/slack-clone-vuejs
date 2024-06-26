<template>
    <div class="my-2" :class="{ 'pointer-events-none': loading }">
        <label v-if="props.label" v-bind="props.labelAttrs" for="" class="mb-1 font-bold text-content-label">{{ label
        }}</label>
        <div class="relative">
            <button @click="$emit('click:prefix', $event)" v-if="iconPrefix" class="absolute inset-y-0 left-2">
                <Icon :name="iconPrefix" />
            </button>
            <input class="w-full gap-2 p-2 border rounded outline-none border-grey-border border-opacity-30 "
                :class="[errors && errors.length ? 'border-red-error border-1 ring-red-error ring-1 ring-inset border-red-error placeholder:text-red-error' : 'focus:border-blue-focus focus:border-1 focus:ring-blue-focus focus:ring-1 ring-inset placeholder:text-content-secondary ', { 'pl-8': iconPrefix, 'pr-8': iconSuffix }]"
                v-bind="inputAttrs" type="text" @input="handleInput" :value="modelValue"
                v-show-max-input-length="showMaxLength">
            <button v-if="!loading && iconSuffix && showMaxLength === null" @click="$emit('click:suffix', $event)"
                class="absolute inset-y-0 right-2">
                <Icon :name="iconSuffix" />
            </button>
            <div v-if="loading" class="absolute h-3 -translate-y-1/2 top-1/2 right-8">
                <slot name="loading">
                    <CustomLoader class="absolute" type="Circular" />
                </slot>
            </div>
        </div>
        <template v-if="!props.optional">
            <p v-for="error in errors" :key="error.$uid" class="ml-1 text-xs text-red-error ">{{ error.$message }}</p>

        </template>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import InlineSvg from 'vue-inline-svg';
import Icon from './Icon.vue';
import SentMessageArrow from './svg/SentMessageArrow.vue';
import CustomLoader from './CustomLoader.vue';


const props = defineProps({
    labelAttrs: {
        type: Object,
        required: false,
        default: () => { }
    },
    label: {
        type: String,
        default: '',
    },
    inputAttrs: {
        type: Object,
        default: () => { }
    },
    optional: Boolean,
    modelValue: {
        type: [String, Number, Boolean]
    },
    errors: {
        type: Array,
        default: () => [],
        required: false
    },
    iconSuffix: {
        type: String,
        default: '',
        required: false
    },
    iconPrefix: {
        type: String,
        default: '',
        required: false
    },
    showMaxLength: {
        type: Number,
        required: false,
        default: () => null
    },
    loading: Boolean
})

const emit = defineEmits()


const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value)
}

</script>