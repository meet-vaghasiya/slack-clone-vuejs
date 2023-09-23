<template >
    <div>
        <component :is="filename" />
    </div>
</template>
<script setup lang="ts">
import Logo from './svg/Logo.vue'
interface Props {
    filename: string
}

const props = defineProps<Props>()
// const filePath = computed<string>(() => {
//     // Use dynamic import to load the SVG file
//     return import(`@/assets/svg/${props.filename}.svg`).then((module) => module.default);
// });

</script>
<style ></style>