<template >
    <div>
        <component :is="allAvailableComponent[props.filename]" />
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import Logo from './svg/Logo.vue'
import SentMessageArrow from './svg/SentMessageArrow.vue';
interface Props {
    filename: string
}

const props = defineProps<Props>()
const allAvailableComponent = computed(() => {
    return {
        Logo,
        SentMessageArrow
    }
})
// const filePath = computed<string>(() => {
//     // Use dynamic import to load the SVG file
//     return import(`@/assets/svg/${props.filename}.svg`).then((module) => module.default);
// });
console.log('hello')

</script>
<style ></style>