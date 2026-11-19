<template>
  <div class="lexical-editor">
    <div class="toolbar" role="toolbar" aria-label="Text formatting">
      <button
        type="button"
        title="Undo"
        aria-label="Undo"
        :disabled="!editorReady || showHtml || !canUndo"
        @mousedown.prevent
        @click="undo"
      >
        ↶
      </button>
      <button
        type="button"
        title="Redo"
        aria-label="Redo"
        :disabled="!editorReady || showHtml || !canRedo"
        @mousedown.prevent
        @click="redo"
      >
        ↷
      </button>
      <button
        v-for="format in blockFormats"
        :key="format.value"
        type="button"
        :title="format.label"
        :aria-label="format.label"
        :aria-pressed="activeBlock === format.value"
        :disabled="!editorReady || showHtml"
        @mousedown.prevent
        @click="changeBlock(format.value)"
      >
        {{ format.label }}
      </button>
      <button
        v-for="format in textFormats"
        :key="format.value"
        type="button"
        :title="format.label"
        :aria-label="format.label"
        :aria-pressed="activeFormats[format.value]"
        :disabled="!editorReady || showHtml"
        @mousedown.prevent
        @click="toggleFormat(format.value)"
      >
        <strong v-if="format.value === 'bold'">B</strong>
        <em v-else-if="format.value === 'italic'">I</em>
        <u v-else-if="format.value === 'underline'">U</u>
        <s v-else>S</s>
      </button>
      <button
        type="button"
        title="Bullet list"
        aria-label="Bullet list"
        :disabled="!editorReady || showHtml"
        @mousedown.prevent
        @click="toggleList('bullet')"
      >
        • List
      </button>
      <button
        type="button"
        title="Numbered list"
        aria-label="Numbered list"
        :disabled="!editorReady || showHtml"
        @mousedown.prevent
        @click="toggleList('number')"
      >
        1. List
      </button>
      <button
        v-for="alignment in alignments"
        :key="alignment.value"
        type="button"
        :title="alignment.label"
        :aria-label="alignment.label"
        :disabled="!editorReady || showHtml"
        @mousedown.prevent
        @click="formatAlignment(alignment.value)"
      >
        {{ alignment.label }}
      </button>
      <button
        type="button"
        title="Add link"
        aria-label="Add link"
        :disabled="!editorReady || showHtml"
        @mousedown.prevent
        @click="toggleLinkControls"
      >
        Link
      </button>
      <button
        type="button"
        title="Remove link"
        aria-label="Remove link"
        :disabled="!editorReady || showHtml"
        @mousedown.prevent
        @click="removeLink"
      >
        Unlink
      </button>
      <button
        type="button"
        title="Insert table"
        aria-label="Insert table"
        :disabled="!editorReady || showHtml"
        @mousedown.prevent
        @click="insertTable"
      >
        Table
      </button>
      <button
        type="button"
        title="Insert image"
        aria-label="Insert image"
        :disabled="!editorReady || showHtml"
        @mousedown.prevent
        @click="toggleImageControls"
      >
        Image
      </button>
      <button
        type="button"
        :aria-pressed="showHtml"
        :aria-label="showHtml ? 'Show rich text editor' : 'Show HTML source'"
        @mousedown.prevent
        @click="showHtml = !showHtml"
      >
        {{ showHtml ? 'Visual editor' : 'HTML source' }}
      </button>
    </div>

    <div v-if="showLinkInput && !showHtml" class="link-controls">
      <input
        v-model="linkUrl"
        type="url"
        aria-label="Link URL"
        placeholder="https://example.com"
        @keydown.enter.prevent="applyLink"
        @keydown.esc="showLinkInput = false"
      >
      <button type="button" @mousedown.prevent @click="applyLink">Insert link</button>
      <button type="button" @mousedown.prevent @click="showLinkInput = false">Cancel</button>
      <p v-if="linkError" class="link-error" role="alert">{{ linkError }}</p>
    </div>

    <div v-if="showImageInput && !showHtml" class="link-controls">
      <input
        v-model="imageUrl"
        type="url"
        aria-label="Image URL"
        placeholder="https://example.com/image.jpg"
        @keydown.enter.prevent="applyImage"
        @keydown.esc="showImageInput = false"
      >
      <input
        v-model="imageAlt"
        type="text"
        aria-label="Image description"
        placeholder="Image description"
        @keydown.enter.prevent="applyImage"
        @keydown.esc="showImageInput = false"
      >
      <button type="button" @mousedown.prevent @click="applyImage">Insert image</button>
      <button type="button" @mousedown.prevent @click="showImageInput = false">Cancel</button>
      <p v-if="imageError" class="link-error" role="alert">{{ imageError }}</p>
    </div>

    <p v-if="editorError" class="editor-error" role="alert">{{ editorError }}</p>
    <div
      v-show="!showHtml"
      ref="editorRoot"
      class="editable-content"
      role="textbox"
      aria-label="Word content"
      aria-multiline="true"
    />
    <textarea
      v-show="showHtml"
      class="html-source"
      aria-label="HTML source"
      :value="modelValue"
      spellcheck="false"
      @input="emitHtml"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import type { LexicalEditor } from 'lexical'

type TextFormat = 'bold' | 'italic' | 'underline' | 'strikethrough'
type BlockFormat = 'paragraph' | 'h2' | 'h3' | 'quote' | 'code'
type ListFormat = 'bullet' | 'number'
type Alignment = 'left' | 'center' | 'right' | 'justify'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const editorRoot = ref<HTMLElement | null>(null)
const editorReady = ref(false)
const editorError = ref('')
const showHtml = ref(false)
const showLinkInput = ref(false)
const linkUrl = ref('')
const linkError = ref('')
const showImageInput = ref(false)
const imageUrl = ref('')
const imageAlt = ref('')
const imageError = ref('')
const canUndo = ref(false)
const canRedo = ref(false)
const activeBlock = ref<BlockFormat>('paragraph')
const activeFormats = reactive<Record<TextFormat, boolean>>({
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false
})

const textFormats: { value: TextFormat; label: string }[] = [
  { value: 'bold', label: 'Bold' },
  { value: 'italic', label: 'Italic' },
  { value: 'underline', label: 'Underline' },
  { value: 'strikethrough', label: 'Strikethrough' }
]
const blockFormats: { value: BlockFormat; label: string }[] = [
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'quote', label: 'Quote' },
  { value: 'code', label: 'Code block' }
]
const alignments: { value: Alignment; label: string }[] = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'justify', label: 'Justify' }
]

let editor: LexicalEditor | null = null
let lexicalApi: typeof import('lexical') | null = null
let htmlApi: typeof import('@lexical/html') | null = null
let richTextApi: typeof import('@lexical/rich-text') | null = null
let listApi: typeof import('@lexical/list') | null = null
let linkApi: typeof import('@lexical/link') | null = null
let selectionApi: typeof import('@lexical/selection') | null = null
let codeApi: typeof import('@lexical/code') | null = null
let tableApi: typeof import('@lexical/table') | null = null
let imageNodeApi: typeof import('../utils/LexicalImageNode') | null = null
let disposers: Array<() => void> = []
let lastEditorHtml = ''

function syncToolbarState() {
  if (!editor || !lexicalApi || !richTextApi || !codeApi) return

  const selection = lexicalApi.$getSelection()
  for (const format of textFormats) {
    activeFormats[format.value] =
      lexicalApi.$isRangeSelection(selection) && selection.hasFormat(format.value)
  }

  if (!lexicalApi.$isRangeSelection(selection)) return

  const topLevelNode = selection.anchor.getNode().getTopLevelElement()
  if (richTextApi.$isHeadingNode(topLevelNode)) {
    const tag = topLevelNode.getTag()
    activeBlock.value = tag === 'h2' || tag === 'h3' ? tag : 'paragraph'
  } else if (richTextApi.$isQuoteNode(topLevelNode)) {
    activeBlock.value = 'quote'
  } else if (codeApi.$isCodeNode(topLevelNode)) {
    activeBlock.value = 'code'
  } else {
    activeBlock.value = 'paragraph'
  }
}

function importHtml(value: string) {
  if (!editor || !lexicalApi || !htmlApi) return

  const parsedHtml = new DOMParser().parseFromString(value || '', 'text/html')
  editor.update(() => {
    const nodes = htmlApi!.$generateNodesFromDOM(editor!, parsedHtml)
    const root = lexicalApi!.$getRoot()
    root.clear()

    if (nodes.length) {
      root.append(...nodes.map(node =>
        lexicalApi!.$isElementNode(node) ? node : lexicalApi!.$createParagraphNode().append(node)
      ))
    } else {
      root.append(lexicalApi!.$createParagraphNode())
    }
  }, { tag: 'history-merge' })
}

function emitHtml(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

function undo() {
  if (!editor || !lexicalApi) return
  editor.dispatchCommand(lexicalApi.UNDO_COMMAND, undefined)
}

function redo() {
  if (!editor || !lexicalApi) return
  editor.dispatchCommand(lexicalApi.REDO_COMMAND, undefined)
}

function toggleFormat(format: TextFormat) {
  if (!editor || !lexicalApi) return
  editor.dispatchCommand(lexicalApi.FORMAT_TEXT_COMMAND, format)
}

function changeBlock(format: BlockFormat) {
  if (!editor || !lexicalApi || !richTextApi || !selectionApi || !codeApi) return

  editor.update(() => {
    selectionApi!.$setBlocksType(lexicalApi!.$getSelection(), () => {
      if (format === 'h2' || format === 'h3') {
        return richTextApi!.$createHeadingNode(format)
      }
      if (format === 'quote') {
        return richTextApi!.$createQuoteNode()
      }
      if (format === 'code') {
        return codeApi!.$createCodeNode()
      }
      return lexicalApi!.$createParagraphNode()
    })
  })
}

function toggleList(format: ListFormat) {
  if (!editor || !lexicalApi || !listApi) return
  const command = format === 'bullet'
    ? listApi.INSERT_UNORDERED_LIST_COMMAND
    : listApi.INSERT_ORDERED_LIST_COMMAND
  editor.dispatchCommand(command, undefined)
}

function formatAlignment(alignment: Alignment) {
  if (!editor || !lexicalApi) return
  editor.dispatchCommand(lexicalApi.FORMAT_ELEMENT_COMMAND, alignment)
}

function toggleLinkControls() {
  linkError.value = ''
  showLinkInput.value = !showLinkInput.value
}

function applyLink() {
  if (!editor || !linkApi) return

  const value = linkUrl.value.trim()
  if (!value) {
    linkError.value = 'Enter a link URL.'
    return
  }

  let url: URL
  try {
    url = new URL(value, window.location.href)
  } catch {
    linkError.value = 'Enter a valid link URL.'
    return
  }

  if (!['http:', 'https:', 'mailto:'].includes(url.protocol)) {
    linkError.value = 'Only HTTP, HTTPS, and email links are allowed.'
    return
  }

  editor.update(() => linkApi!.$toggleLink(url.href))
  showLinkInput.value = false
  linkUrl.value = ''
  linkError.value = ''
}

function removeLink() {
  if (!editor || !linkApi) return
  editor.update(() => linkApi!.$toggleLink(null))
}

function toggleImageControls() {
  imageError.value = ''
  showImageInput.value = !showImageInput.value
}

function applyImage() {
  if (!editor || !lexicalApi || !imageNodeApi) return

  const value = imageUrl.value.trim()
  if (!value) {
    imageError.value = 'Enter an image URL.'
    return
  }

  let url: URL
  try {
    url = new URL(value, window.location.href)
  } catch {
    imageError.value = 'Enter a valid image URL.'
    return
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    imageError.value = 'Only HTTP and HTTPS image URLs are allowed.'
    return
  }

  editor.update(() => {
    lexicalApi!.$insertNodes([imageNodeApi!.$createImageNode(url.href, imageAlt.value.trim())])
  })
  showImageInput.value = false
  imageUrl.value = ''
  imageAlt.value = ''
  imageError.value = ''
}

function insertTable() {
  if (!editor || !tableApi) return
  editor.dispatchCommand(tableApi.INSERT_TABLE_COMMAND, {
    columns: '3',
    rows: '3',
    includeHeaders: true
  })
}

onMounted(async () => {
  try {
    const [lexical, html, richText, lists, links, selection, history, code, table, imageNode] = await Promise.all([
      import('lexical'),
      import('@lexical/html'),
      import('@lexical/rich-text'),
      import('@lexical/list'),
      import('@lexical/link'),
      import('@lexical/selection'),
      import('@lexical/history'),
      import('@lexical/code'),
      import('@lexical/table'),
      import('../utils/LexicalImageNode')
    ])
    lexicalApi = lexical
    htmlApi = html
    richTextApi = richText
    listApi = lists
    linkApi = links
    selectionApi = selection
    codeApi = code
    tableApi = table
    imageNodeApi = imageNode

    editor = lexical.createEditor({
      namespace: 'WordsAdminContent',
      nodes: [
        richText.HeadingNode,
        richText.QuoteNode,
        lists.ListNode,
        lists.ListItemNode,
        links.LinkNode,
        code.CodeNode,
        code.CodeHighlightNode,
        table.TableNode,
        table.TableRowNode,
        table.TableCellNode,
        imageNode.LexicalImageNode
      ],
      theme: {
        heading: {
          h2: 'lexical-heading-h2',
          h3: 'lexical-heading-h3'
        },
        paragraph: 'lexical-paragraph',
        quote: 'lexical-quote',
        list: {
          ol: 'lexical-list-ol',
          ul: 'lexical-list-ul',
          listitem: 'lexical-list-item'
        },
        table: 'lexical-table',
        tableCell: 'lexical-table-cell',
        tableCellHeader: 'lexical-table-cell-header',
        tableRow: 'lexical-table-row',
        code: 'lexical-code',
        link: 'lexical-link',
        text: {
          bold: 'lexical-text-bold',
          italic: 'lexical-text-italic',
          underline: 'lexical-text-underline',
          strikethrough: 'lexical-text-strikethrough'
        }
      },
      onError(error) {
        console.error('Lexical editor error:', error)
        editorError.value = `Editor error: ${error.message}`
      }
    })

    disposers.push(richText.registerRichText(editor))
    disposers.push(lists.registerList(editor))
    disposers.push(history.registerHistory(editor, history.createEmptyHistoryState(), 500))
    disposers.push(table.registerTablePlugin(editor))
    disposers.push(table.registerTableSelectionObserver(editor))
    disposers.push(editor.registerCommand(
      lexical.CAN_UNDO_COMMAND,
      (value) => {
        canUndo.value = value
        return false
      },
      lexical.COMMAND_PRIORITY_LOW
    ))
    disposers.push(editor.registerCommand(
      lexical.CAN_REDO_COMMAND,
      (value) => {
        canRedo.value = value
        return false
      },
      lexical.COMMAND_PRIORITY_LOW
    ))
    editor.setRootElement(editorRoot.value)

    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        syncToolbarState()
        const htmlValue = html.$generateHtmlFromNodes(editor!, null)
        if (htmlValue !== lastEditorHtml) {
          lastEditorHtml = htmlValue
          emit('update:modelValue', htmlValue)
        }
      })
    })

    importHtml(props.modelValue || '')
    editorReady.value = true
  } catch (error) {
    editorError.value = error instanceof Error ? error.message : 'Could not initialize the Lexical editor.'
    console.error('Could not initialize the Lexical editor:', error)
  }
})

watch(() => props.modelValue, (value) => {
  if (!showHtml.value && editor && value !== lastEditorHtml) {
    importHtml(value || '')
  }
})

watch(showHtml, (showSource) => {
  editor?.setEditable(!showSource)
  if (!showSource && editor) {
    importHtml(props.modelValue || '')
  }
})

onBeforeUnmount(() => {
  for (const dispose of disposers) dispose()
  disposers = []
  editor?.setRootElement(null)
  editor = null
})
</script>

<style scoped>
.lexical-editor {
  overflow: hidden;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: white;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding: 6px;
  border-bottom: 1px solid #cbd5e1;
  background: #f8fafc;
}

.toolbar button,
.toolbar select,
.link-controls button {
  min-height: 32px;
  padding: 4px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background: white;
  color: #172033;
  font: inherit;
  cursor: pointer;
}

.toolbar button:hover:not(:disabled),
.link-controls button:hover {
  background: #e2e8f0;
}

.toolbar button:disabled,
.toolbar select:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.toolbar button[aria-pressed='true'] {
  border-color: #2563eb;
  background: #dbeafe;
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

.link-error,
.editor-error {
  flex-basis: 100%;
  margin: 0;
  color: #b91c1c;
  font-size: 13px;
}

.editable-content {
  min-height: 240px;
  padding: 12px;
  outline: none;
  color: #172033;
}

.editable-content:focus {
  box-shadow: inset 0 0 0 2px #93c5fd;
}

.editable-content :deep(.lexical-paragraph) {
  margin: 0 0 0.75rem;
}

.editable-content :deep(.lexical-heading-h2),
.editable-content :deep(.lexical-heading-h3) {
  margin: 1rem 0 0.5rem;
}

.editable-content :deep(.lexical-quote) {
  margin: 0.75rem 0;
  padding-left: 1rem;
  border-left: 3px solid #94a3b8;
  color: #475569;
}

.editable-content :deep(.lexical-list-ol),
.editable-content :deep(.lexical-list-ul) {
  padding-left: 1.5rem;
}

.editable-content :deep(.lexical-table) {
  width: 100%;
  margin: 1rem 0;
  border-collapse: collapse;
  table-layout: fixed;
}

.editable-content :deep(.lexical-table-cell),
.editable-content :deep(.lexical-table-cell-header) {
  min-width: 80px;
  padding: 8px;
  border: 1px solid #cbd5e1;
  vertical-align: top;
}

.editable-content :deep(.lexical-table-cell-header) {
  background: #f1f5f9;
  font-weight: 700;
}

.editable-content :deep(.lexical-code) {
  overflow-x: auto;
  padding: 12px;
  border-radius: 4px;
  background: #f1f5f9;
  font: 13px/1.5 monospace;
}

.editable-content :deep(img) {
  max-width: 100%;
  height: auto;
}

.editable-content :deep(.lexical-link) {
  color: #1d4ed8;
  text-decoration: underline;
}

.editable-content :deep(.lexical-text-bold) {
  font-weight: 700;
}

.editable-content :deep(.lexical-text-italic) {
  font-style: italic;
}

.editable-content :deep(.lexical-text-underline) {
  text-decoration: underline;
}

.editable-content :deep(.lexical-text-strikethrough) {
  text-decoration: line-through;
}

.html-source {
  display: block;
  width: 100%;
  min-height: 264px;
  padding: 12px;
  border: 0;
  background: white;
  color: #172033;
  font: 13px/1.5 monospace;
  resize: vertical;
}
</style>
