<template>
  <main class="admin-page">
    <section v-if="!authenticated" class="login-panel">
      <h1>Words Admin</h1>
      <form class="form-grid" @submit.prevent="login">
        <label>
          Username
          <input v-model="credentials.username" autocomplete="username" required>
        </label>
        <label>
          Password
          <input v-model="credentials.password" type="password" autocomplete="current-password" required>
        </label>
        <button class="primary-button" type="submit" :disabled="busy">Sign in</button>
        <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>
      </form>
    </section>

    <section v-else class="admin-shell">
      <header class="admin-header">
        <div>
          <h1>Words Admin</h1>
          <p>Edit words in the Supabase <code>en_words</code> table.</p>
        </div>
        <button class="secondary-button" type="button" @click="logout">Sign out</button>
      </header>

      <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message" role="status">{{ successMessage }}</p>

      <div class="editor-layout">
        <aside class="word-sidebar">
          <button class="primary-button" type="button" :disabled="busy" @click="startNewWord">
            Add new word
          </button>
          <label>
            Search words
            <input v-model="searchQuery" type="search" placeholder="Search by word or ID">
          </label>
          <p v-if="!loading" class="word-count">{{ filteredWords.length }} of {{ words.length }} words</p>
          <div class="word-list">
            <button
              v-for="word in filteredWords"
              :key="String(word.id)"
              type="button"
              class="word-item"
              :class="{ selected: formRecord?.id === word.id }"
              @click="editWord(word)"
            >
              <strong>{{ displayTitle(word) }}</strong>
              <small>{{ word.id }}</small>
            </button>
            <p v-if="!loading && filteredWords.length === 0" class="empty-list">No words found.</p>
          </div>
        </aside>

        <form v-if="formRecord" class="word-form form-grid" @submit.prevent="saveWord">
          <div class="word-form-header">
            <h2>{{ creating ? 'Add new word' : `Edit ${displayTitle(formRecord)}` }}</h2>
            <button
              v-if="!creating && !confirmDelete"
              class="delete-button"
              type="button"
              :disabled="busy"
              @click="confirmDelete = true"
            >
              Delete word
            </button>
            <div v-else-if="!creating && confirmDelete" class="delete-confirmation" role="group" aria-label="Confirm word deletion">
              <span>Delete this word permanently?</span>
              <button class="delete-button" type="button" :disabled="busy" @click="deleteWord">
                {{ busy ? 'Deleting…' : 'Confirm delete' }}
              </button>
              <button class="secondary-button" type="button" :disabled="busy" @click="confirmDelete = false">
                Cancel
              </button>
            </div>
          </div>
          <label v-if="creating">
            ID <span class="hint">(lowercase URL slug, e.g. new-word)</span>
            <input
              :value="String(formRecord.id)"
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              required
              @input="updateField('id', ($event.target as HTMLInputElement).value)"
            >
          </label>
          <template v-for="([key, value]) in editableFields" :key="key">
            <label v-if="key === 'content' && typeof value === 'string'">
              Content
              <AdminRichTextEditor
                :model-value="value"
                @update:model-value="updateField(key, $event)"
              />
            </label>
            <label v-else-if="Array.isArray(value)">
              {{ fieldLabel(key) }} <span class="hint">(comma-separated)</span>
              <input
                :value="value.map(String).join(', ')"
                @input="updateArrayField(key, ($event.target as HTMLInputElement).value)"
              >
            </label>
            <label v-else>
              {{ fieldLabel(key) }}
              <textarea
                v-if="typeof value === 'object' && value !== null"
                :value="jsonValues[key] ?? JSON.stringify(value, null, 2)"
                rows="4"
                @input="updateJsonField(key, ($event.target as HTMLTextAreaElement).value)"
              />
              <textarea
                v-else-if="key === 'en_meta_desc'"
                :value="String(value ?? '')"
                rows="3"
                @input="updateField(key, ($event.target as HTMLTextAreaElement).value)"
              />
              <input
                v-else-if="typeof value === 'boolean'"
                type="checkbox"
                :checked="value"
                @change="updateField(key, ($event.target as HTMLInputElement).checked)"
              >
              <input
                v-else
                :type="typeof value === 'number' ? 'number' : 'text'"
                :value="value == null ? '' : String(value)"
                :required="creating && key === 'word'"
                @input="updateField(key, ($event.target as HTMLInputElement).value)"
              >
            </label>
          </template>
          <button class="primary-button save-button" type="submit" :disabled="busy">
            {{ busy ? (creating ? 'Adding…' : 'Saving…') : (creating ? 'Add word' : 'Save changes') }}
          </button>
        </form>
        <div v-else class="empty-editor">
          {{ loading ? 'Loading words…' : 'Select a word to edit.' }}
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRaw } from 'vue'
import type { WordRecord } from '../../server/utils/supabaseWords'
import AdminRichTextEditor from '~/components/AdminRichTextEditor.vue'

const authenticated = ref(false)
const busy = ref(false)
const loading = ref(false)
const words = ref<WordRecord[]>([])
const formRecord = ref<WordRecord | null>(null)
const searchQuery = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const confirmDelete = ref(false)
const creating = ref(false)
const jsonError = ref('')
const jsonValues = reactive<Record<string, string>>({})
const credentials = reactive({ username: '', password: '' })
const editableFields = computed(() => Object.entries(formRecord.value || {}).filter(([key]) => key !== 'id'))

const filteredWords = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return words.value.filter(word =>
    !query ||
    displayTitle(word).toLowerCase().includes(query) ||
    String(word.id).toLowerCase().includes(query)
  )
})

function displayTitle(word: WordRecord): string {
  return String(word.word || word.name || word.id)
}

function fieldLabel(key: string): string {
  const labels: Record<string, string> = {
    content: 'Content',
    en_meta_desc: 'SEO description',
    img: 'Image path',
    img_height: 'Image height',
    img_width: 'Image width',
    'related-words': 'Related words',
    related_words: 'Related words',
    word: 'Word'
  }
  return labels[key] || key.replaceAll(/[-_]/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase())
}

function clearMessages() {
  errorMessage.value = ''
  successMessage.value = ''
}

function clearJsonValues() {
  for (const key of Object.keys(jsonValues)) {
    Reflect.deleteProperty(jsonValues, key)
  }
  jsonError.value = ''
}

async function loadWords() {
  loading.value = true
  try {
    words.value = await $fetch<WordRecord[]>('/api/admin/words')
  } finally {
    loading.value = false
  }
}

async function login() {
  clearMessages()
  busy.value = true
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: credentials })
    authenticated.value = true
    credentials.password = ''
    await loadWords()
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Sign in failed. Check your username and password.')
  } finally {
    busy.value = false
  }
}

async function logout() {
  clearMessages()
  try {
    await $fetch('/api/admin/logout', { method: 'POST' })
    authenticated.value = false
    formRecord.value = null
    words.value = []
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Could not sign out.')
  }
}

function editWord(word: WordRecord) {
  clearMessages()
  clearJsonValues()
  creating.value = false
  confirmDelete.value = false
  formRecord.value = structuredClone(toRaw(word))
}

function startNewWord() {
  clearMessages()
  clearJsonValues()
  searchQuery.value = ''
  creating.value = true
  confirmDelete.value = false
  formRecord.value = {
    id: '',
    word: '',
    content: '',
    en_meta_desc: '',
    img: '',
    img_height: null,
    img_width: null
  }
}

function updateField(key: string, value: string | number | boolean) {
  if (!formRecord.value) return
  const original = formRecord.value[key]
  if (key === 'img_height' || key === 'img_width') {
    formRecord.value[key] = typeof value === 'string' && value !== '' ? Number(value) : null
  } else {
    formRecord.value[key] = typeof original === 'number' && typeof value === 'string' && value !== ''
      ? Number(value)
      : value
  }
}

function updateArrayField(key: string, value: string) {
  if (!formRecord.value) return
  formRecord.value[key] = value.split(',').map(item => item.trim()).filter(Boolean)
}

function updateJsonField(key: string, value: string) {
  if (!formRecord.value) return
  jsonValues[key] = value
  try {
    formRecord.value[key] = JSON.parse(value)
    jsonError.value = ''
  } catch {
    jsonError.value = `${fieldLabel(key)} must contain valid JSON.`
  }
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object' && 'data' in error) {
    const data = error.data
    if (data && typeof data === 'object' && 'statusMessage' in data && typeof data.statusMessage === 'string') {
      return data.statusMessage
    }
  }
  return error instanceof Error ? error.message : fallback
}

async function saveWord() {
  if (!formRecord.value) return
  clearMessages()
  if (jsonError.value) {
    errorMessage.value = jsonError.value
    return
  }

  const record = structuredClone(toRaw(formRecord.value))
  busy.value = true

  try {
    if (creating.value) {
      const createdWord = await $fetch<WordRecord>('/api/admin/words', {
        method: 'POST',
        body: record
      })
      words.value = [...words.value, createdWord].sort((a, b) =>
        displayTitle(a).localeCompare(displayTitle(b), 'en', { sensitivity: 'base' })
      )
      formRecord.value = structuredClone(createdWord)
      creating.value = false
      successMessage.value = 'Word added successfully.'
    } else {
      const id = String(record.id)
      delete record.id
      await $fetch(`/api/admin/words/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: record
      })
      await loadWords()
      const updatedWord = words.value.find(word => String(word.id) === id)
      if (updatedWord) formRecord.value = structuredClone(toRaw(updatedWord))
      successMessage.value = 'Word saved successfully.'
    }
  } catch (error) {
    errorMessage.value = getErrorMessage(error, creating.value ? 'Could not add this word.' : 'Could not save this word.')
  } finally {
    busy.value = false
  }
}

async function deleteWord() {
  if (!formRecord.value || creating.value) return

  clearMessages()
  const id = String(formRecord.value.id)
  busy.value = true

  try {
    await $fetch(`/api/admin/words/${encodeURIComponent(id)}`, { method: 'DELETE' })
    words.value = words.value.filter(word => String(word.id) !== id)
    formRecord.value = null
    creating.value = false
    confirmDelete.value = false
    successMessage.value = 'Word deleted successfully.'
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Could not delete this word.')
  } finally {
    busy.value = false
  }
}

onMounted(async () => {
  try {
    await $fetch('/api/admin/session')
    authenticated.value = true
    await loadWords()
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode !== 401) {
      errorMessage.value = getErrorMessage(error, 'Could not connect to the admin API.')
    }
  }
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  padding: 32px 20px;
  background: #f1f5f9;
  color: #172033;
}

.login-panel,
.admin-shell {
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #dbe2ea;
  border-radius: 10px;
  background: white;
  box-shadow: 0 8px 24px rgb(15 23 42 / 7%);
}

.login-panel {
  max-width: 420px;
  margin-top: 8vh;
}

.login-panel h1,
.admin-header h1 {
  margin: 0 0 16px;
  text-align: left;
  font-size: 28px;
}

.form-grid {
  display: grid;
  gap: 16px;
}

.form-grid label,
.word-sidebar label {
  display: grid;
  gap: 6px;
}

.form-grid input:not([type='checkbox']),
.form-grid textarea,
.word-sidebar input {
  width: 100%;
  min-height: 40px;
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  background: white;
  font: inherit;
}

.form-grid textarea {
  resize: vertical;
}

.primary-button,
.secondary-button {
  min-height: 40px;
  padding: 8px 14px;
  border: 0;
  border-radius: 5px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.primary-button {
  background: #1d4ed8;
  color: white;
}

.primary-button:disabled {
  cursor: wait;
  opacity: .65;
}

.secondary-button {
  border: 1px solid #cbd5e1;
  background: white;
  color: #172033;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.admin-header p,
.word-count {
  margin: 0;
  color: #64748b;
}

.editor-layout {
  display: grid;
  grid-template-columns: minmax(210px, 280px) minmax(0, 1fr);
  gap: 24px;
}

.word-sidebar {
  display: grid;
  align-content: start;
  gap: 14px;
}

.word-list {
  display: grid;
  max-height: 65vh;
  overflow: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.word-item {
  display: grid;
  gap: 3px;
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #e2e8f0;
  background: white;
  text-align: left;
  cursor: pointer;
}

.word-item:last-child {
  border-bottom: 0;
}

.word-item.selected {
  background: #eff6ff;
}

.word-item small,
.hint {
  color: #64748b;
  font-size: 12px;
  font-weight: 400;
}

.word-form {
  min-width: 0;
}

.word-form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.word-form h2 {
  margin: 0 0 4px;
}

.delete-confirmation {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  color: #991b1b;
}

.delete-button {
  min-height: 40px;
  padding: 8px 14px;
  border: 1px solid #b91c1c;
  border-radius: 5px;
  background: #b91c1c;
  color: white;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.delete-button:disabled,
.secondary-button:disabled {
  cursor: wait;
  opacity: .65;
}

.save-button {
  justify-self: start;
}

.empty-list,
.empty-editor {
  padding: 18px;
  color: #64748b;
}

.error-message {
  color: #b91c1c;
}

.success-message {
  color: #15803d;
}

@media (max-width: 740px) {
  .admin-page {
    padding: 12px;
  }

  .admin-shell,
  .login-panel {
    padding: 16px;
  }

  .editor-layout {
    grid-template-columns: 1fr;
  }

  .word-list {
    max-height: 240px;
  }
}
</style>
