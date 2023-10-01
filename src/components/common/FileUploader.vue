<template>
    <div @dragover.prevent="handleDragOver" @drop.prevent="handleDrop" @dragleave.prevent="handleDragLeave" class="relative"
        @dragenter.prevent="isDragging = true" :class="{ '  bg-black  bg-opacity-80': isDragging }">

        <slot :handler="handleFiles" v-bind="{ readUrl, metaData }" />
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

type MetadataType = {
    fileSize: number
    fileExtention: string
    fileName: string
}


const props = defineProps({
    src: {
        type: String,
        required: false,
        default: null
    },
    accept: {
        type: String,
        default: 'image/*'
    }
})

const emit = defineEmits()

const readUrl = ref(props.src || '')
const isDragging = ref<boolean>(false)
const metaData = ref<MetadataType>({
    fileSize: NaN,
    fileExtention: '',
    fileName: '',

})
const handleFiles = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    console.log(files, 'files')
    if (!files || !files[0]) {
        console.error('No file here')
        return
    }
    const file = files[0]
    emit('upload:file', file)
    metaData.value = {
        fileSize: Math.round((file.size / 1024 / 1024) * 100) / 100,
        fileExtention: file.name.split(".").pop(),
        fileName: file.name.split(".").shift(),

    }
    filePreview(file)
}
const filePreview = (file) => {
    let reader = new FileReader()
    const test = reader.readAsDataURL(file)

    reader.onloadend = function () {
        readUrl.value = reader.result
    }

}

const handleDragOver = (e) => {
    isDragging.value = true
    // console.log(e, 'drag over')
}

const handleDrop = (e) => {
    const file = e.dataTransfer.items[0].getAsFile()
    isDragging.value = false
    console.log(file, 'drop file')
    filePreview(file)
}
const handleDragLeave = (e) => {
    console.log('leave calling')
    isDragging.value = false
    // console.log(e, 'drag leave')
}

</script>