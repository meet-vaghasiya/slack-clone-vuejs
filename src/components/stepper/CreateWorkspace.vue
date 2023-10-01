<template>
    <ValidateInput type="text" v-model="name" :input-attrs="{ placeholder: ' Ex: Acme Marketing or Acme Co' }"
        :errors="v$.name.$errors" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ValidateInput from '../common/ValidateInput.vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

const name = ref("")
const rules = () => ({
    name: { required, minLength: minLength(5) }
})
const v$ = useVuelidate(rules, { name }, { $autoDirty: true })

const isValid = () => {
    return v$.value.$invalid
}

</script>