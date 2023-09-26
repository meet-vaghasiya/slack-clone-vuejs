<template>
    <div>
        <label for="" class="block mb-2 font-semibold">Add coworker by email</label>
        <textarea v-model="emails" placeholder="Add co-workers" class="w-full p-2 border outline-none" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emails = ref('')

</script>