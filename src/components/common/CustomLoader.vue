<template>
    <component :is="allAvailableComponent[props.type]" />
</template>

<script setup lang="ts" >
import { computed } from 'vue'
import { Circular } from '@/components/common/loaders'
const props = defineProps({
    type: {
        type: String,
        required: true
    }
})

const allAvailableComponent = computed(() => {
    return {
        Circular,

    }
})

</script>

<style scoped>
.loader-1 {
    height: 32px;
    width: 32px;
    -webkit-animation: loader-1-1 4.8s linear infinite;
    animation: loader-1-1 4.8s linear infinite;
}

@-webkit-keyframes loader-1-1 {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes loader-1-1 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loader-1 span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
    clip: rect(0, 32px, 32px, 16px);
    -webkit-animation: loader-1-2 1.2s linear infinite;
    animation: loader-1-2 1.2s linear infinite;
}
</style>