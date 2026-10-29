<template>
  <div class="rich-editor">
    <div class="toolbar" role="toolbar" aria-label="Text formatting">
      <button type="button" aria-label="Bold" title="Bold" @mousedown.prevent @click="format('bold')"><strong>B</strong></button>
      <button type="button" aria-label="Italic" title="Italic" @mousedown.prevent @click="format('italic')"><em>I</em></button>
      <button type="button" aria-label="Underline" title="Underline" @mousedown.prevent @click="format('underline')"><u>U</u></button>
      <button type="button" aria-label="Heading" title="Heading" @mousedown.prevent @click="format('formatBlock', 'h2')">H2</button>
      <button type="button" aria-label="Bullet list" title="Bullet list" @mousedown.prevent @click="format('insertUnorderedList')">• List</button>
      <button type="button" aria-label="Numbered list" title="Numbered list" @mousedown.prevent @click="format('insertOrderedList')">1. List</button>
      <button
        type="button"
        aria-label="Add link"
        title="Add link"
        @mousedown.prevent="rememberSelection"
        @click="showLinkInput = !showLinkInput; linkError = ''"
      >
        Link
      </button>
      <button type="button" aria-label="Paragraph" title="Paragraph" @mousedown.prevent @click="format('formatBlock', 'p')">P</button>
      <button
        type="button"
        :aria-pressed="showHtml"
        :aria-label="showHtml ? 'Show rich text' : 'Show HTML source'"
        @mousedown.prevent
        @click="showHtml = !showHtml"
      >
        {{ showHtml ? 'Visual' : 'HTML' }}
      </button>
    </div>
    <div v-if="showLinkInput" class="link-controls">
      <input
        v-model="linkUrl"
        type="url"
        aria-label="Link URL"
        placeholder="https://example.com"
        @keydown.enter.prevent="applyLink"
      >
      <button type="button" @mousedown.prevent @click="applyLink">Insert link</button>
      <p v-if="linkError" class="link-error" role="alert">{{ linkError }}</p>
    </div>
    <div
      v-if="!showHtml"
      ref="editor"
      class="editable-content"
      contenteditable="true"
      role="textbox"
      aria-multiline="true"
      @input="emitContent"
    />
    <textarea
      v-else
      class="html-source"
      aria-label="HTML source"
      :value="modelValue"
      spellcheck="false"
      @input="emitHtml"
    />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const editor = ref<HTMLElement | null>(null)
const showLinkInput = ref(false)
const showHtml = ref(false)
const linkUrl = ref('')
const linkError = ref('')
const savedSelection = ref<Range | null>(null)

function syncContent(value: string) {
  if (editor.value && editor.value.innerHTML !== value) {
    editor.value.innerHTML = value
  }
}

function emitContent() {
  emit('update:modelValue', editor.value?.innerHTML || '')
}

function emitHtml(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

function format(command: string, value?: string) {
  editor.value?.focus()
  document.execCommand(command, false, value)
  emitContent()
}

function rememberSelection() {
  const selection = window.getSelection()
  if (selection?.rangeCount && editor.value?.contains(selection.anchorNode)) {
    savedSelection.value = selection.getRangeAt(0).cloneRange()
  }
}

function applyLink() {
  const href = linkUrl.value.trim()
  if (!href) {
    linkError.value = 'Enter a link URL.'
    return
  }

  let url: URL
  try {
    url = new URL(href, window.location.href)
  } catch {
    linkError.value = 'Enter a valid link URL.'
    return
  }

  if (!['http:', 'https:', 'mailto:'].includes(url.protocol)) {
    linkError.value = 'Only HTTP, HTTPS, and email links are allowed.'
    return
  }

  editor.value?.focus()
  const selection = window.getSelection()
  if (savedSelection.value && selection) {
    selection.removeAllRanges()
    selection.addRange(savedSelection.value)
  }
  document.execCommand('createLink', false, href)
  emitContent()
  showLinkInput.value = false
  linkUrl.value = ''
  linkError.value = ''
  savedSelection.value = null
}

onMounted(() => syncContent(props.modelValue || ''))
watch(() => props.modelValue, value => syncContent(value || ''))
watch(showHtml, async (showSource) => {
  if (!showSource) {
    await nextTick()
    syncContent(props.modelValue || '')
  }
})
</script>

<style scoped>
.rich-editor {
  overflow: hidden;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 6px;
  border-bottom: 1px solid #cbd5e1;
  background: #f8fafc;
}

.toolbar button {
  min-height: 32px;
  padding: 4px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.toolbar button:hover {
  background: #e2e8f0;
}

.link-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px;
  border-bottom: 1px solid #cbd5e1;
}

.link-controls input {
  flex: 1 1 220px;
  min-width: 0;
  min-height: 32px;
  padding: 4px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font: inherit;
}

.link-controls button {
  min-height: 32px;
  padding: 4px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.link-error {
  flex-basis: 100%;
  margin: 0;
  color: #b91c1c;
  font-size: 13px;
}

.editable-content {
  min-height: 220px;
  padding: 12px;
  outline: none;
}

.html-source {
  display: block;
  width: 100%;
  min-height: 244px;
  padding: 12px;
  border: 0;
  background: white;
  color: #172033;
  font: 13px/1.5 monospace;
  resize: vertical;
}

.editable-content:focus {
  box-shadow: inset 0 0 0 2px #93c5fd;
}
</style>
