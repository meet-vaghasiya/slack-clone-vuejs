<template>
    <div class="flex flex-col items-start gap-3 p-5 ">
        <CustomBtn text variant="red">Hello</CustomBtn>
        <CustomBtn text>Hello</CustomBtn>
        <CustomBtn outline>Hello</CustomBtn>
        <CustomBtn rounded="full" variant="secondary" disabled>Hello</CustomBtn>
        <CustomBtn variant="green" :loading="false">Hello</CustomBtn>
        <CustomBtn prepend-icon="plus" appendIcon="plus"> Hello</CustomBtn>
        <CustomBtn icon="plus" flat rounded="full">Hello</CustomBtn>
    </div>
</template>

<script setup lang="ts">
import CustomBtn from '@/components/common/CustomBtn.vue'

</script>