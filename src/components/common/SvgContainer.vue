<template >
    <div>
        <component :is="allAvailableComponent[props.filename]" />
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import Logo from './svg/Logo.vue'
import SentMessageArrow from './svg/SentMessageArrow.vue';
import Plus from './svg/Plus.vue';
import Close from './svg/Close.vue';
import Lock from './svg/Lock.vue'
import Hash from './svg/Hash.vue'
const props = defineProps({
    filename: {
        type: String,
        required: true
    }
})
const allAvailableComponent = computed(() => {
    return {
        Logo,
        SentMessageArrow,
        Plus,
        Close,
        Lock,
        Hash
    }
})
// const filePath = computed<string>(() => {
//     // Use dynamic import to load the SVG file
//     return import(`@/assets/svg/${props.filename}.svg`).then((module) => module.default);
// });

</script>
<style ></style>