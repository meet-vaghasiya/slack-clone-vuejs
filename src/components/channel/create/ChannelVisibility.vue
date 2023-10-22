<template>
    <div>
        <p class="text-lg font-semibold">Visibility</p>
        <ul>
            <li>
                <input id="public" type="radio" name="channel" :value="false" v-model="isPrivate">
                <label for="public" class="break-all ">
                    Public - anyone in <span class="font-bold break-all">{{ name }} </span>
                </label>
            </li>
            <li>
                <input id="private" type="radio" name="channel" :value="true" v-model="isPrivate">
                <label for="private">
                    Private- only specific people
                </label>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const isPrivate = ref(false)
const name = ref('change')
</script>