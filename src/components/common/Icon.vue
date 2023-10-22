<template >
    <div>
        <svg width="20" height="20" viewBox="0 0 20 20" v-bind="{ ...$attrs }">
            <use :href="`${defaultFilePath}#${name}`"></use>
        </svg>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import svgJson from '@/assets/svg.json'
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        required: false,
    },

})
const defaultFilePath = computed(() => {
    if (props.filepath) return props.filepath
    return svgJson[props.name] ? svgJson[props.name] : '/assets/svg/all.svg'
})
// const filePath = computed<string>(() => {
//     // Use dynamic import to load the SVG file
//     return import(`@/assets/svg/${props.filename}.svg`).then((module) => module.default);
// });

</script>
<style ></style>