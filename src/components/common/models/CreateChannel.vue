<template>
    <CommonModel :confirm-text="confirmText" v-on="$listeners" @on:click="handleClick" @after:close="setInitialState">
        <template #title>
            <div>
                <p>{{ modalTitle }}</p>
                <p v-if="currentStep !== 1" class="text-sm break-all text-content-secondary">{{ `#
                    ${name}` }}</p>
            </div>

        </template>
        <template #body>
            <template v-if="currentStep === 1">
                <ChannelName v-model="name" ref="channelName" />
            </template>
            <template v-if="currentStep === 2">
                <ChannelVisibility />
            </template>

            <template v-if="currentStep === 3">
                <AddMembers />
            </template>
        </template>
        <template #footer="{ closeModal }">
            <CustomBtn variant="green" flat class="flex ml-auto" @click="handleClick"> {{ confirmText }}</CustomBtn>
        </template>
    </CommonModel>
</template>

<script setup lang="ts">
import CommonModel from '@/components/common/CommonModel.vue'
import { ref, computed } from 'vue'

import { useRoute } from 'vue-router';
import { create, addMembers } from '@/api/channels'
import { useChannelsStore } from '../../../stores/channles';

import ChannelName from '@/components/channel/create/ChannelName.vue'
import ChannelVisibility from '@/components/channel/create/ChannelVisibility.vue'
import AddMembers from '@/components/channel/create/AddMembers.vue'
import CustomBtn from '../CustomBtn.vue';


const props = defineProps({
    value: {
        type: Boolean,
        required: true
    },

})

const channelName = ref(null)

// get workspace id
const route = useRoute()
const workspaceId = computed(() => route.params.id)

const emit = defineEmits()


// all refs
const channleStore = useChannelsStore()
const inviteMembers = ref([])
const currentChannelId = ref(null)
const currentStep = ref(1)

const isPrivate = ref(false)
const name = ref('df')


// modal title
const modalTitle = computed(() => {
    return currentStep.value === 3 ? 'Add people' : "Create a channel"
})

// footer button title
const confirmText = computed(() => {
    if (currentStep.value == 1) return 'Next'
    if (currentStep.value == 2) return 'Create'
    return 'Done'
})






const handleClick = async () => {
    if (currentStep.value === 1) {
        console.log(channelName.value, '================')
        if (!(await channelName.value.isValid())) return
        currentStep.value++
    } else if (currentStep.value == 2) {
        const { data } = await create(workspaceId.value, { name: name.value, is_private: isPrivate.value })
        channleStore.addChannel(data.data)
        currentChannelId.value = data.data.id
        currentStep.value++
    } else {
        if (!(await v$3.value.$validate())) return
        const payload = {
            is_private: isPrivate.value,
            member_ids: isPrivate.value ? inviteMembers.value : undefined
        }
        try {
            const { data } = await addMembers(workspaceId.value, currentChannelId.value, payload)
            emit('update:modelValue', false)

        } catch (error) {
            console.log({ error })
        }
    }
}
const setInitialState = () => {
    name.value = ''
    isPrivate.value = false
    currentStep.value = 1

}



</script>