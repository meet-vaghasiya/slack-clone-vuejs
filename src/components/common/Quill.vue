<template>
    <div class="my-10 custom-quill">

        <div ref="editor"></div>
    </div>
</template>
  
<script setup>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Quill from 'quill'
import { onMounted, ref, onBeforeUnmount, onUnmounted, watch } from 'vue'

const defaultOptions = {
    theme: 'snow',
    placeholder: 'Insert content here ...',
    readOnly: false,
}

const props = defineProps({
    content: String,
    modelValue: String,
    disabled: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Object,
        required: false,
        default: () => ({}),
    },
})

const emit = defineEmits()

const state = {
    editorOption: {},
    quill: null
}
const editor = ref(null)
const editorOption = ref({})
let _content = '' //  This field is requied to track previous record , so while watcher we can't emit text-change if old and new content is same.

const mergeOptions = (def, custom) => {
    for (const key in custom) {
        if (!def[key] || key !== 'modules') {
            def[key] = custom[key]
        } else {
            mergeOptions(def[key], custom[key])
        }
    }
    return def
}
watch(
    () => props.modelValue,
    val => {
        if (state.quill && val !== _content) {
            if (val) {
                _content = val
                state.quill.pasteHTML(val)
            } else if (!val) {
                state.quill.setText('')
            }
        }
    }
)

watch(
    () => props.disabled,
    val => {
        if (state.quill) {
            state.quill.enable(!val)
        }
    }
)

const initialize = () => {
    if (editor.value) {
        editorOption.value = mergeOptions(defaultOptions, props.options)
        editorOption.value.readOnly = props.disabled ? true : false

        state.quill = new Quill(editor.value, editorOption.value)

        if (props.modelValue) {
            state.quill.clipboard.dangerouslyPasteHTML(0, props.value)
        }

        state.quill.on('selection-change', (range) => {
            if (!range) {
                emit('blur', state.quill)
            } else {
                emit('focus', state.quill)
            }
        })

        state.quill.on('text-change', () => {
            if (props.disabled) {
                state.quill.enable(false)
            }
            let html = editor.value.children[0].innerHTML
            const text = state.quill.getText()
            if (html) html = html.replace(/<p><br><\/p>/g, '')
            _content = html
            emit('update:modelValue', html)
            emit('change', { html, text, quill: state.quill })
        })
    }
}

onBeforeUnmount(() => {
    const editorToolbar = editor.value.previousSibling
    if (editorToolbar && editorToolbar.nodeType === 1 && editorToolbar.className.indexOf('ql-toolbar') > -1) {
        editorToolbar.parentNode.removeChild(editorToolbar)
    }
})

onMounted(() => {
    initialize()
})

onUnmounted(() => {
    state.quill = null
})
</script>
  