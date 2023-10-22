<template>
    <div>
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
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMembersStore } from '@/stores/members';
import useVuelidate from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import InviteInWorkspaceAutocomplete from '@/components/common/InviteInWorkspaceAutocomplete.vue'

const membersStore = useMembersStore();


const props = defineProps({
    workspaceId: [String, Number]
})

const isPrivate = ref(false)
const name = ref('change')
const inviteMembers = ref([])
const currentChannelId = ref(null)
const joinAutomatically = ref(false)

const rules3 = () => {
    return {
        inviteMembers: isPrivate.value ? ({ required, minLength: minLength(1) }) : true,
        currentChannelId: required
    }
}
const v$3 = useVuelidate(rules3, { inviteMembers, currentChannelId }, { $autoDirty: true })

</script>