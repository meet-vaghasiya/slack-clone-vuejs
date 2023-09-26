<template>
    <input type="text" v-model="name" placeholder="Enter channel name"
        class="w-full p-2 border outline-none border-b-content-primary max-w-[400px] rounded">
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref("")



</script>