<template>
    <div class="max-w-2xl px-20 py-10">
        <StepperWorkspace v-slot="{ currentStep }" @click:next="handleNext">
            <template v-if="currentStep === 0">
                <ValidateInput type="text" v-model="name" :input-attrs="{ placeholder: ' Ex: Acme Marketing or Acme Co' }"
                    :errors="v$0.name.$errors" />
            </template>
        </StepperWorkspace>
    </div>
</template>

<script setup lang="ts">
import CreateWorkspace from '@/components/stepper/CreateWorkspace.vue'
import NameAndProfile from '@/components/stepper/NameAndProfile.vue'
import AddTeammates from "@/components/stepper/AddTeammates.vue"
import CommonChannel from '@/components/stepper/CommonChannel.vue'
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

import StepperWorkspace from './common/StepperWorkspace.vue';
// const mapperComponent = [CreateWorkspace, NameAndProfile, AddTeammates, CommonChannel]
import { ref } from 'vue'
import ValidateInput from './common/ValidateInput.vue';
import axios from '@/api/axios';
import { useUserStore } from '@/stores/user'
import { useWorkspaceStore } from '@/stores/workspace'



const userStore = useUserStore()
const workspaceStore = useWorkspaceStore()
const name = ref("")
const rules = () => ({
    name: { required, minLength: minLength(5) }
})
const v$0 = useVuelidate(rules, { name }, { $autoDirty: true })
const step0 = async () => {
    const isValidate = await v$0.value.$validate()
    if (!isValidate) return false

    try {

        const { data } = await axios.post('/workspaces', { name: name.value })
        workspaceStore.setWorkspace(data.workspace)
        return true
    } catch (error) {
        return false
    }
    return isValidate
}
const step1 = () => {

}
const handleNext = async (currentStep, next) => {
    // for step 1
    let shouldContinue = false
    if (currentStep === 0) {
        shouldContinue = await step0()
    } else if (currentStep === 1) {
        step1()
    }
    if (shouldContinue) next()

}

</script>
