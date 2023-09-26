<template>
    <div>
        <input type="name" v-model="name" placeholder="Something" class="w-full p-2 border outline-none">
        <p class="mb-4 font-semibold mt-14">Your profile photo (optional)</p>
        <div class="flex gap-x-3">
            <img src="" alt="Profile photo">
            <div>
                <p>Help your teammates know they're talking to right persion</p>
                <button class="px-4 py-2 mt-4 border rounded border-1">Upload Photo</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
const name = ref("")


</script>