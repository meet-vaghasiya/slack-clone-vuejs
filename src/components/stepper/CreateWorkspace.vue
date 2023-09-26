<template>
    <input type="text" v-model="name" placeholder="Ex: Acme Marketing or Acme Co"
        class="w-full p-2 border outline-none border-b-content-primary max-w-[400px] rounded">
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref("")



</script>