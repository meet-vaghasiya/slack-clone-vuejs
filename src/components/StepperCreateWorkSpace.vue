<template>
    <div class="max-w-2xl px-20 py-10">
        <StepperWorkspace v-slot="{ currentStep }">
            <component :is="mapperComponent[currentStep]" />
        </StepperWorkspace>
    </div>
</template>

<script setup lang="ts">
import CreateWorkspace from '@/components/stepper/CreateWorkspace.vue'
import NameAndProfile from '@/components/stepper/NameAndProfile.vue'
import AddTeammates from "@/components/stepper/AddTeammates.vue"
import CommonChannel from '@/components/stepper/CommonChannel.vue'

import StepperWorkspace from './common/StepperWorkspace.vue';
const mapperComponent = [CreateWorkspace, NameAndProfile, AddTeammates, CommonChannel]

</script>
