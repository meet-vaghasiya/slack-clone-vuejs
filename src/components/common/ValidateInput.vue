<template>
    <div class="my-2">
        <label v-if="props.label" v-bind="props.labelAttrs" for="" class="mb-1 font-bold text-content-label">{{ label
        }}</label>
        <input type="text" class="w-full p-2 border rounded outline-none border-grey-border border-opacity-30 "
            :class="[errors && errors.length ? 'border-red-error border-1 ring-red-error ring-1 ring-inset border-red-error placeholder:text-red-error' : 'focus:border-blue-focus focus:border-1 focus:ring-blue-focus focus:ring-1 ring-inset placeholder:text-content-secondary ']"
            v-bind="inputAttrs" @input="handleInput" :value="modelValue">
        <template v-if="!props.optional">
            <p v-for="error in errors" :key="error.$uid" class="ml-1 text-xs text-red-error ">{{ error.$message }}</p>

        </template>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';


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
    }
})

const emit = defineEmits()


const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value)
}

</script>