<template>
    <div>
        <Multiselect v-model="selected" :options="options" track-by="id" label="name" :allow-empty="true" multiple
            :showLabels="false" placeholder="Enter name or email" :close-on-select="false" @search-change="handleChange"
            v-bind="{ loading }" :internal-search="false" :hide-selected="true" :showNoOptions="false">
            <div v-if="loading" class="loader">Loading...</div>

            <template v-slot:caret="props">
                <div>
                </div>
            </template>

            <template v-slot:selection="props">
                <div class="flex gap-1">
                    <div class="flex items-center rounded-sm bg-link bg-opacity-30" v-for="option in props.values">
                        <CustomImage class="w-6 h-6 rounded-sm option__image" :src="option.avatar" alt="Images" />
                        <span class="px-2 font-medium text-black option__desc"><span class="text-lg option__title">{{
                            option.name }}</span></span>
                    </div>
                </div>
            </template>

            <template v-slot:option="props">
                <div class="flex gap-x-2">
                    <CustomImage class="w-6 h-6 rounded-sm option__image" :src="props.option.avatar" alt="Images" />
                    <div class="option__desc"><span class="option__title">{{ props.option.name }}</span></div>

                </div>
            </template>
        </Multiselect>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Multiselect from 'vue-multiselect'
import ProfileSetup from '../../views/ProfileSetup.vue';
import Icon from './Icon.vue';
// import 'vue-multiselect/dist/vue-multiselect.min.css'
import { list as memberList } from "@/api/members"
import { useWorkspaceStore } from "@/stores/workspace";
import { CircularBars } from '@loaders'
import CustomImage from './CustomImage.vue';

const selected = ref('')
const options = ref([])
const loading = ref(false)
const workspaceStore = useWorkspaceStore();

const handleChange = async () => {

    loading.value = true
    options.value = []
    try {
        const { data } = await memberList(workspaceStore.id)
        options.value = data.data
    } catch {

    } finally {
        loading.value = false
    }


}

</script>   
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
