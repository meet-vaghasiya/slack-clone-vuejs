<template>
    <div class="my-10 custom-quill">

        <div ref="editor"></div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, toRefs, defineProps } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import "quill-mention";
import * as Emoji from "quill-emoji";
Quill.register("modules/emoji", Emoji);

const emit = defineEmits()
const props = defineProps({
    modelValue: {
        type: [String, null],
        default: ''
    }
})

const { modelValue } = toRefs(props)

const editor = ref(null);
let quill = null;
const content = ref(null)
const htmlContent = ref(null)

watch(modelValue, (val) => {
    if (val) {
        quill.pasteHTML(val)
    } else if (!val) {
        quill.setText('')
    }
})

const toolbarOptions = {
    container: [
        ['bold']
    ]
}
const defaultOptions = {
    theme: 'snow',
    placeholder: 'Insert content here ...'
}



const handleTextChange = () => {
    let html = editor.value.children[0].innerHTML
    const text = quill.getText()
    if (html === '<p><br></p>') html = ''
    emit('update:modelValue', html)
}

onMounted(() => {
    quill = new Quill(editor.value, defaultOptions);
    quill.on('text-change', handleTextChange)
});

onBeforeUnmount(() => {
    quill.off('text-change', handleTextChange);
    quill = null;
});
</script>

<!-- <style lang="scss">
.custom-quill {
    @apply border border-grey-border border-opacity-20 rounded-lg overflow-hidden;

    .ql-formats {

        >button {
            @apply box-content p-1;
        }

        &:not(:last-child) {
            border-right: 1px solid grey;
            margin-right: 0;
            padding-right: 15px;

        }

        &:not(:first-child) {
            padding-left: 15px;
        }

    }

    >* {
        @apply border-none
    }

    .ql-container {
        @apply border-none
    }

    .ql-toolbar {
        @apply bg-grey-light border-none
    }

    button:hover {
        @apply bg-grey-disabled rounded-lg
    }

    // .ql-snow .ql-stroke, .ql-fill {
    //     @apply stroke-grey-icon hover:stroke-grey-border
    // }

    // button:hover {

    //     .ql-snow .ql-stroke,
    //     .ql-fill {
    //         @apply stroke-grey-icon hover:stroke-grey-border
    //     }
    // }

}
</style> -->
  