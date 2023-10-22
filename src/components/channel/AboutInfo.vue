<template>
    <div class="flex flex-col gap-y-5">
        <div class="p-3 bg-white rounded-xl">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold">Channel name</h2>
                <CustomBtn class="font-semibold" text variant="blue">
                    Edit
                </CustomBtn>
            </div>
            <div class="flex items-center gap-x-1">
                <Icon :name="channelInfo.is_private ? 'lock' : 'hashtag-thick'" />
                <p>{{ channelInfo.name }}</p>
            </div>
        </div>
        <div class="overflow-hidden bg-white divide-y rounded-xl">
            <div class="p-3 rounded-t-lg">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold">Topic</h2>
                    <CustomBtn class="font-semibold" text variant="blue">
                        Edit
                    </CustomBtn>
                </div>

                <p>{{ channelInfo.topic ?? 'Add a topic' }}</p>
            </div>
            <div class="p-3">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold">Description</h2>
                    <CustomBtn class="font-semibold" text variant="blue">
                        Edit
                    </CustomBtn>
                </div>

                <p>{{ channelInfo.topic ?? 'Add a description' }}</p>
            </div>
            <div class="p-3 rounded-b-lg">
                <h2 class="text-lg font-semibold">Created by</h2>
                <p>{{ `${channelInfo.creator_id} on ${channelInfo.created_at}` ?? 'Add a description' }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CustomBtn from '../common/CustomBtn.vue';
import Icon from '../common/Icon.vue';




const { channelInfo } = defineProps({

    channelInfo: {
        type: Object,
        required: true
    }
})

</script>