<template>
    <div>
        <Multiselect v-model="selected" :options="options" track-by="id" label="name" :allow-empty="true" multiple
            :showLabels="false" placeholder="Enter name or email" :close-on-select="false" @search-change="handleChange"
            v-bind="{ loading }" :internal-search="false" :hide-selected="true" :showNoOptions="false"
            @update:modelValue="handleSelect">
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
import { emit } from 'process';

const selected = ref([])
const options = ref([])
const loading = ref(false)
const workspaceStore = useWorkspaceStore();

const emit = defineEmits()
const props = defineProps({
    returns: {
        type: String,
        default: null
    }
})

const handleChange = async (text: string) => {
    loading.value = true
    options.value = []
    try {
        const { data } = await memberList(workspaceStore.id, { search: text })
        options.value = data.data
    } catch {

    } finally {
        loading.value = false
    }


}

const handleSelect = async (val) => {
    emit('update:modelValue', props.returns ? val?.map((el) => el[props.returns]) : val)
}


</script>   
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
