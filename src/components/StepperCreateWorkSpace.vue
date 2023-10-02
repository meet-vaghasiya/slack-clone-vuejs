<template>
    <div class="max-w-2xl px-20 py-10">
        <StepperWorkspace v-slot="{ currentStep }" @click:next="handleNext">
            <template v-if="currentStep === 0">
                <ValidateInput type="text" v-model="name" :input-attrs="{ placeholder: ' Ex: Acme Marketing or Acme Co' }"
                    :errors="v$0.name.$errors" />
            </template>
            <template v-if="currentStep == 1">
                <div>
                    <ValidateInput type="name" v-model="name1" :input-attrs="{ placeholder: 'Something' }"
                        :errors="v$1.name1.$errors" />
                    <p class="mb-4 font-semibold mt-14">Your profile photo (optional)</p>

                    <FileUploader class="flex gap-x-3" @upload:file="avatar = $event"
                        v-slot="{ handler, readUrl, metaData }">
                        <CustomImage :src="readUrl" class="flex-shrink-0 rounded-lg h-36 aspect-square"
                            alt="Profile photo" />
                        <div>
                            <p>Help your teammates know they're talking to right persion</p>
                            <input type="file" accept="image/*" id="avatar" class="hidden" @change="handler">
                            <label for="avatar"
                                class="inline-block px-4 py-2 mt-4 border rounded cursor-pointer border-1">Upload
                                Photo</label>
                            <template v-if="v$1.avatar.$errors.length">
                                <p v-for="error in v$1.avatar.$errors" :key="error.$uid"
                                    class="ml-1 text-xs text-red-error ">{{
                                        error.$message }}</p>
                            </template>
                        </div>
                    </FileUploader>

                </div>

            </template>
            <template v-if="currentStep == 2">
                <div>
                    <label for="" class="block mb-2 font-semibold">Add coworker by email</label>
                    <TaggableInput class="flex flex-wrap gap-2 p-3 border" v-slot="{ tags, addTag, removeTag }"
                        v-model="inviteEmails">
                        <span class="p-1 px-2 text-white rounded-md bg-content-secondary" @click="removeTag(index)"
                            v-for="(item, index) in tags" :key="index">
                            {{ item }}
                        </span>
                        <input type="text" v-model.trim="currTag" placeholder="Add co-workers"
                            class="flex-1 px-2 outline-none" @keydown.enter="addTag(currTag), currTag = ''"
                            @keydown.backspace="currTag == '' && removeTag(tags.length - 1)">
                    </TaggableInput>
                    <template v-if="v$2.inviteEmails.$errors.length">
                        <p v-for="error in v$2.inviteEmails.$errors" :key="error.$uid" class="ml-1 text-xs text-red-error ">
                            {{
                                error.$message }}</p>
                    </template>
                </div>
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
import { required, minLength, email, helpers } from '@vuelidate/validators';

import StepperWorkspace from './common/StepperWorkspace.vue';
// const mapperComponent = [CreateWorkspace, NameAndProfile, AddTeammates, CommonChannel]
import { ref } from 'vue'
import ValidateInput from './common/ValidateInput.vue';
import axios from '@/api/axios';
import { create as memberCreate, sendInvites } from '@/api/member';

import { useUserStore } from '@/stores/user'
import { useWorkspaceStore } from '@/stores/workspace'
import CustomImage from './common/CustomImage.vue';
import FileUploader from './common/FileUploader.vue';
import TaggableInput from './common/TaggableInput.vue';


const workspaceStore = useWorkspaceStore()
const userStore = useUserStore()


// todo: create seprate form for all of this
const name = ref("")
const avatar = ref("")
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
}



// todo : all for step 1
const name1 = ref("")
const rules1 = () => ({
    name1: { required, minLength: minLength(3) },
    avatar: {}
})
const $externalResults = ref({})

const v$1 = useVuelidate(rules1, { name1 }, { $autoDirty: true, $externalResults })

const step1 = async () => {
    if (v$1.value.$touch(), v$1.value.$invalid) return false
    const formData = new FormData()
    formData.append('name', name1.value)
    formData.append('avatar', avatar.value)
    try {

        const { data } = await memberCreate(workspaceStore.id, formData)
        userStore.setMember(data.data)
        console.log(data, 'all data')
        return true
    } catch (error) {
        if (error.response) {
            $externalResults.value = error.response.data.errors

            console.log(error.response.data.errors, 'external validatoin')
        } else if (error.request) {
            console.log("No response received:", error.request);
        } else {
            // Something else went wrong
            console.log("Error:", error.message);
        }
        return false
    }

}

// step 2

const currTag = ref('')
const inviteEmails = ref([])

const rules2 = () => ({
    inviteEmails: {
        required,
        minLength: minLength(1),
        $each: helpers.forEach({
            email // todo: will make correct
        })
    }
})
const v$2 = useVuelidate(rules2, { inviteEmails }, { $autoDirty: true })

const step2 = async () => {
    if (v$2.value.$touch(), v$2.value.$invalid) return false

    try {
        const { data } = sendInvites(workspaceStore.id, { emails: inviteEmails.value })
        return true
    } catch (error) {
        if (error.response) {
            $externalResults.value = error.response.data.errors

            console.log(error.response.data.errors, 'external validatoin')
        } else if (error.request) {
            console.log("No response received:", error.request);
        } else {
            // Something else went wrong
            console.log("Error:", error.message);
        }
        return false
    }



}


const handleNext = async (currentStep, next) => {
    // for step 1
    let shouldContinue = false
    if (currentStep === 0) {
        shouldContinue = await step0()
    } else if (currentStep === 1) {
        shouldContinue = await step1()
    } else if (currentStep === 2) {
        shouldContinue = await step2()
    }
    if (shouldContinue) next()

}

</script>
