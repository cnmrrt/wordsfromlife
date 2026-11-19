<template>
  <div class="rich-editor">
    <ClientOnly>
      <Editor
        :model-value="modelValue"
        license-key="gpl"
        :init="editorInit"
        @update:model-value="emit('update:modelValue', $event)"
      />
      <template #fallback>
        <div class="editor-loading">Loading editor…</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce'

defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const editorInit = {
  base_url: '/tinymce',
  suffix: '.min',
  skin: 'oxide',
  content_css: 'default',
  height: 320,
  menubar: false,
  branding: false,
  promotion: false,
  statusbar: true,
  resize: true,
  plugins: 'lists link table code wordcount fullscreen',
  toolbar: 'undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link table | removeformat | code fullscreen',
  block_formats: 'Paragraph=p; Heading 2=h2; Heading 3=h3; Heading 4=h4; Blockquote=blockquote',
  browser_spellcheck: true,
  paste_data_images: false,
  relative_urls: false,
  remove_script_host: false,
  convert_urls: false,
  content_style: 'body { font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; }'
}

void tinymce
</script>

<style scoped>
.rich-editor {
  margin-top: 6px;
  width: 100%;
}

.editor-loading {
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #64748b;
  background: #fff;
}

:deep(.tox-tinymce) {
  border-radius: 6px;
}
</style>
