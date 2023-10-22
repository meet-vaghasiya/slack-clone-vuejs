<template>
    <ValidateInput :inputAttrs="{ placeholder: '# e.g. plan-budget', class: 'mt-3' }" :modelValue="name"
        @update:modelValue="handleChange" label="Name" :errors="v$.name.$errors" :show-max-length="80" />
    <p class="text-xs text-content-secondary">Channels are where conversations happen around a topic. Use a name
        that is easy to find and
        understand.</p>
</template>

<script setup>
import ValidateInput from '@common/ValidateInput.vue';
import { computed, ref } from 'vue'
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { isValid as isNameValid, create, addMembers } from '@/api/channels'
import { useRoute } from 'vue-router';


const props = defineProps({
    modelValue: String,
})
const emit = defineEmits()


const route = useRoute()
const workspaceId = computed(() => route.params.id)
const isLoading = ref(false)
const name = ref(props.modelValue)
const isNameTaken = async (value) => {
    try {
        isLoading.value = true
        const valid = await isNameValid(workspaceId.value, { name: name.value })
        return valid.data.isValid
    } catch (error) {
        console.log("🚀 ~ file: ChannelName.vue:27 ~ isNameTaken ~ error:", error)
        return false
    } finally {
        isLoading.value = false
    }
}
const rules = () => ({
    name: { required, maxLength: maxLength(80), isUnique: helpers.withAsync(isNameTaken) },
})

const v$ = useVuelidate(rules, { name: props.modelValue }, { $autoDirty: true })

const isValid = async () => {
    return await $v.value.$validate()
}

const handleChange = (eve) => {
    name.value = eve
    emit('update:modelValue', eve)
}
</script>