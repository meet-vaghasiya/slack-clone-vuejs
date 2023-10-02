<template>
    <div>
        <slot v-bind="{ tags, addTag, removeTag }" />
    </div>
</template>

<script setup lang="ts">

import { ref, watch, defineEmits } from 'vue'
const tags = ref<string[]>([])
const emit = defineEmits()

const addTag = (tag: string) => {
    const findIndex = tags.value.findIndex((e) => e === tag)
    tag.trim()
    if (findIndex === -1 && tag.length) {
        tags.value.push(tag)
    }
}
const removeTag = (index: number) => {
    tags.value.splice(index, 1)
}
watch(tags.value, () => {
    emit('update:modelValue', tags.value)
})
</script>