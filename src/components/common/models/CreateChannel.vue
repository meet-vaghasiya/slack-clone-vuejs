<template>
    <CommonModel :confirm-text="confirmText" v-on="$listeners" @on:click="handleClick" @after:close="setInitialState"
        :is-loading="isLoading">
        <template #title>
            <div>
                <p>{{ modalTitle }}</p>
                <p v-if="currentStep !== 1" class="text-sm break-all text-content-secondary">{{ `#
                    ${name}` }}</p>
            </div>

        </template>
        <template #body>
            <template v-if="currentStep === 1">
                <ValidateInput :inputAttrs="{ placeholder: '# e.g. plan-budget', class: 'mt-3' }" v-model="name"
                    label="Name" :errors="v$.name.$errors" :show-max-length="80" @keydown.enter="handleClick" />
                <p class="text-xs text-content-secondary">Channels are where conversations happen around a topic. Use a name
                    that is easy to find and
                    understand.</p>
            </template>
            <template v-if="currentStep === 2">
                <p class="text-lg font-semibold">Visibility</p>
                <ul>
                    <li>
                        <input id="public" type="radio" name="channel" :value="0" v-model="isPrivate">
                        <label for="public" class="break-all ">
                            Public - anyone in <span class="font-bold break-all">{{ name }} </span>
                        </label>
                    </li>
                    <li>
                        <input id="private" type="radio" name="channel" :value="1" v-model="isPrivate">
                        <label for="private">
                            Private- only specific people
                        </label>
                    </li>
                </ul>
            </template>

            <template v-if="currentStep === 3">
                <ul>
                    <li>
                        <input id="public" type="radio" name="channel" :value="false" v-model="isPrivate">
                        <label for="public" class="join_auto">
                            Add all {{ membersStore.members.length }} members of <span class="font-bold break-all">{{ name
                            }}</span>
                        </label>
                    </li>
                    <li>
                        <input id="private" type="radio" name="channel" :value="true" v-model="isPrivate">
                        <label for="private">
                            Private- only specific people
                        </label>
                    </li>
                </ul>
                <InviteInWorkspaceAutocomplete v-if="isPrivate" v-model="inviteMembers" returns="id" />
                <p v-for="error in v$3.inviteMembers.$errors" :key="error.$uid" class="ml-1 text-xs text-red-error ">{{
                    error.$message }}
                </p>

                <div class="mt-5">
                    <input id="join_auto" type="radio" name="join" :value="true" v-model="joinAutomatically">

                    <label for="join_auto">
                        Automatically add anyone who joins {{ name }}

                    </label>
                </div>
            </template>
        </template>
    </CommonModel>
</template>

<script setup lang="ts">
import CommonModel from '@/components/common/CommonModel.vue'
import ValidateInput from '../ValidateInput.vue';
import { ref, computed } from 'vue'
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { compileScript } from 'vue/compiler-sfc';
import { useRoute } from 'vue-router';
import { isValid, create, addMembers } from '@/api/channels'
import { useChannelsStore } from '../../../stores/channles';
import InviteInWorkspaceAutocomplete from '@/components/common/InviteInWorkspaceAutocomplete.vue'

const props = defineProps({
    value: {
        type: Boolean,
        required: true
    },

})
const name = ref('')
const isPrivate = ref(false)
const route = useRoute()
const isLoading = ref(false)
const workspaceId = computed(() => route.params.id)
const channleStore = useChannelsStore()
const inviteMembers = ref([])
const isNameTaken = async (value) => {
    try {
        isLoading.value = true
        const valid = await isValid(workspaceId.value, { name: value })
        return valid.data.isValid
    } catch (error) {
        return false
    } finally {
        isLoading.value = false
    }
}
const rules = () => ({

    name: { required, maxLength: maxLength(80), isUnique: helpers.withAsync(isNameTaken) },// add validation that, it's not already in existing channel

})
import { useMembersStore } from '@/stores/members';
const membersStore = useMembersStore();
const emit = defineEmits()
const searchByName = ref('')
const noOfUser = ref(null)
const currentChannelId = ref(null)
const v$ = useVuelidate(rules, { name }, { $autoDirty: true })
const currentStep = ref(1)
const confirmText = computed(() => {
    if (currentStep.value == 1) return 'Next'
    if (currentStep.value == 2) return 'Create'
    return 'Done'
})
const joinAutomatically = ref(false)
const modalTitle = computed(() => {
    return currentStep.validate === 3 ? 'Add people' : "Create a channel"
})

const rules3 = () => {
    return {
        inviteMembers: isPrivate.value ? ({ required, minLength: minLength(1) }) : true,
        currentChannelId: required
    }
}
const v$3 = useVuelidate(rules3, { inviteMembers, currentChannelId }, { $autoDirty: true })

const handleClick = async () => {
    if (currentStep.value === 1) {
        if (!(await v$.value.$validate())) return
        currentStep.value++
    } else if (currentStep.value == 2) {
        const { data } = await create(workspaceId.value, { name: name.value, is_private: isPrivate.value })
        channleStore.addChannel(data.data)
        currentChannelId.value = data.data.id
        currentStep.value++
    } else {
        console.log('pppppppppppppp')
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

    v$.value.$reset()
    v$3.value.$reset()
}



</script>