<template>
    <div class="relative overflow-hidden"> <!-- Show loader while image is loading  -->

        <!-- Show default image if provided -->
        <img v-if="showDefaultImage" :src="defaultImage" :alt="alt" class="object-cover w-full h-full" />


        <div v-if="loading" class="absolute inset-0 flex items-center justify-center ">
            <div class="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
        <img v-if="!error" :src="props.src" :alt="alt" class="object-cover w-full h-full duration-500 transition-blur"
            :class="[!loading ? 'blur-0' : 'blur-sm']" @load="handleImageLoad" @error="handleImageError" />


        <!-- Show failed image if image loading fails -->
        <img v-else :src="failedImage" :alt="alt" class="object-cover w-full h-full" />
    </div>
</template>
  
<script setup lang="ts">
import { ref, defineProps, watch, computed } from 'vue';

const props = defineProps({
    src: {
        type: [String, null],
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    defaultImage: {
        type: String,
        required: false,
        default: '/assets/images/default.jpg'
    },
    failedImage: {
        type: String,
        required: false,
        default: '/assets/images/failed-to-load.png'
    }

});


const loading = ref(false);
const error = ref(false);
const showDefaultImage = computed(() => !props.src)
const handleImageLoad = () => {
    loading.value = false;
};

const handleImageError = () => {

    loading.value = false;
    error.value = true;
};

// Watch the src prop for changes and reset the error state
watch(() => props.src, () => {
    loading.value = true;
    error.value = false;
});
</script>
  
