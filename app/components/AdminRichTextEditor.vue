<template>
  <div class="rich-editor">
    <div class="rich-toolbar" role="toolbar" aria-label="Metin biçimlendirme">
      <button type="button" aria-label="Kalın" title="Kalın" @mousedown.prevent @click="format('bold')">
        <strong>B</strong>
      </button>
      <button type="button" aria-label="İtalik" title="İtalik" @mousedown.prevent @click="format('italic')">
        <em>I</em>
      </button>
      <button type="button" aria-label="Altı çizili" title="Altı çizili" @mousedown.prevent @click="format('underline')">
        <u>U</u>
      </button>
      <button type="button" aria-label="Başlık" title="Başlık" @mousedown.prevent @click="format('formatBlock', 'h2')">
        H2
      </button>
      <button type="button" aria-label="Madde işaretli liste" title="Madde işaretli liste" @mousedown.prevent @click="format('insertUnorderedList')">
        • List
      </button>
      <button type="button" aria-label="Numaralı liste" title="Numaralı liste" @mousedown.prevent @click="format('insertOrderedList')">
        1. List
      </button>
      <button type="button" aria-label="Bağlantı ekle" title="Bağlantı ekle" @mousedown.prevent @click="addLink">
        Bağlantı
      </button>
      <button type="button" aria-label="Paragraf" title="Paragraf" @mousedown.prevent @click="format('formatBlock', 'p')">
        P
      </button>
    </div>
    <div
      ref="editor"
      class="rich-content"
      contenteditable="true"
      role="textbox"
      aria-multiline="true"
      @input="emitContent"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const editor = ref<HTMLElement | null>(null)

function syncContent(value: string) {
  if (editor.value && editor.value.innerHTML !== value) {
    editor.value.innerHTML = value
  }
}

function emitContent() {
  emit('update:modelValue', editor.value?.innerHTML || '')
}

function format(command: string, value?: string) {
  editor.value?.focus()
  document.execCommand(command, false, value)
  emitContent()
}

function addLink() {
  const href = window.prompt('Bağlantı adresini girin')
  if (href?.trim()) {
    format('createLink', href.trim())
  }
}

onMounted(() => syncContent(props.modelValue || ''))
watch(() => props.modelValue, value => syncContent(value || ''))
</script>

<style scoped>
.rich-editor {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  overflow: hidden;
}

.rich-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 6px;
  border-bottom: 1px solid #cbd5e1;
  background: #f8fafc;
}

.rich-toolbar button {
  min-height: 32px;
  padding: 4px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.rich-toolbar button:hover {
  background: #e2e8f0;
}

.rich-content {
  min-height: 160px;
  padding: 12px;
  outline: none;
}

.rich-content:focus {
  box-shadow: inset 0 0 0 2px #93c5fd;
}
</style>
