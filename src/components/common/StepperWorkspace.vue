<template>
    <div class="text-content-secondary">
        <h3 class="mb-8 text-xs font-semibold">Step {{ currentStep + 1 }} of {{ totalSteps }}</h3>
        <h1 class="mb-6 text-5xl font-bold text-black">{{ texts[currentStep].title }}</h1>
        <h2 class="mb-8 text-base font-semibold" v-if="texts[currentStep].subtitle">{{
            texts[currentStep].subtitle }}</h2>
        <slot :currentStep="currentStep"></slot>
        <button class="block py-2 mt-20 text-white border-none outline-none px-14 rouded bg-brand"
            @click="handleNextStep">Next</button>
    </div>
</template>


<script setup lang="ts">
import { useStepper } from '@/hooks/stepper'
import { useWorkspaceStore } from '@/stores/workspace'
import { useUserStore } from '../../stores/user';
const workspaceStore = useWorkspaceStore()
const userStore = useUserStore()

import { defineEmits, ref } from 'vue'
const emit = defineEmits();
const { currentStep, nextStep, totalSteps } = useStepper(4);
const stepperRule = {
    0: !!workspaceStore.id,
    1: !!userStore.hasMember
}
while (stepperRule[currentStep.value] === true) {
    nextStep()
}
const texts = [
    {
        'title': "What's the name of your company or team?",
        "subtitle": "This will be the name of your Slack workspace- shoose something that your team will recognize"
    },
    {
        'title': "What's is your name?",
        "subtitle": "Adding your name and profile helps your teammates recognize and connect with you more easily."
    },
    {
        'title': "Who else is on the this team?",
    },
    {
        'title': "What's your team working on right now?",
        "subtitle": "This could be anything: a project, campaign ,event, or the deal you're trying to close."
    },
]

// const props = defineProps({
//     title: { type: String, required: false },
//     subtitle: { type: String, required: false, default: '' },
// })

const handleNextStep = () => {
    emit('click:next', currentStep.value, nextStep)

}

</script>