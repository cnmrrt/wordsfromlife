<template>
  <main class="admin-page">
    <section v-if="!authenticated" class="login-panel">
      <h1>Kelime Yönetimi</h1>
      <form class="form-grid" @submit.prevent="login">
        <label>
          Kullanıcı adı
          <input v-model="credentials.username" autocomplete="username" required>
        </label>
        <label>
          Şifre
          <input v-model="credentials.password" type="password" autocomplete="current-password" required>
        </label>
        <button class="primary-button" type="submit" :disabled="busy">Giriş yap</button>
        <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>
      </form>
    </section>

    <section v-else class="admin-shell">
      <header class="admin-header">
        <div>
          <h1>Kelime Yönetimi</h1>
          <p>{{ words.length }} kelime · Değişiklikler words.json dosyasına kaydedilir.</p>
        </div>
        <button class="secondary-button" type="button" @click="logout">Çıkış yap</button>
      </header>

      <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message" role="status">{{ successMessage }}</p>

      <div class="editor-layout">
        <aside class="word-sidebar">
          <button class="primary-button" type="button" @click="startNewWord">Yeni kelime ekle</button>
          <label>
            Kelime ara
            <input v-model="searchQuery" type="search" placeholder="Kelime veya URL kısa adı">
          </label>
          <div class="word-list">
            <button
              v-for="word in filteredWords"
              :key="word.id"
              type="button"
              class="word-item"
              :class="{ selected: formRecord?.id === word.id && previousId === word.id }"
              @click="editWord(word)"
            >
              <strong>{{ word.word || '(başlıksız)' }}</strong>
              <small>{{ word.id }}</small>
            </button>
          </div>
        </aside>

        <form v-if="formRecord" class="word-form form-grid" @submit.prevent="saveWord">
          <h2>{{ previousId === null ? 'Yeni kelime' : `${formRecord.word} kelimesini düzenle` }}</h2>
          <template v-for="([key, value]) in formFields" :key="key">
            <label v-if="key === 'content'">
              İçerik
              <AdminRichTextEditor
                :model-value="String(value ?? '')"
                @update:model-value="updateField(key, $event)"
              />
            </label>
            <label v-else-if="Array.isArray(value)">
              {{ fieldLabel(key) }} <span class="hint">(virgülle ayırın)</span>
              <input
                :value="value.join(', ')"
                @input="updateArrayField(key, ($event.target as HTMLInputElement).value)"
              >
            </label>
            <label v-else>
              {{ fieldLabel(key) }}
              <textarea
                v-if="key === 'en_meta_desc'"
                :value="String(value ?? '')"
                rows="3"
                @input="updateField(key, ($event.target as HTMLTextAreaElement).value)"
              />
              <textarea
                v-else-if="typeof value === 'object' && value !== null"
                :value="jsonValues[key] ?? JSON.stringify(value, null, 2)"
                rows="4"
                @input="updateJsonField(key, ($event.target as HTMLTextAreaElement).value)"
              />
              <input
                v-else
                :type="typeof value === 'number' ? 'number' : 'text'"
                :value="value == null ? '' : String(value)"
                @input="updateField(key, ($event.target as HTMLInputElement).value)"
              >
            </label>
          </template>
          <button class="primary-button save-button" type="submit" :disabled="busy">
            {{ busy ? 'Kaydediliyor…' : 'Kaydet' }}
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import AdminRichTextEditor from '~/components/AdminRichTextEditor.vue'

type WordRecord = Record<string, unknown> & { id: string }

const authenticated = ref(false)
const busy = ref(false)
const words = ref<WordRecord[]>([])
const formRecord = ref<WordRecord | null>(null)
const previousId = ref<string | null>(null)
const searchQuery = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const jsonError = ref('')
const jsonValues = reactive<Record<string, string>>({})
const credentials = reactive({ username: '', password: '' })
const formFields = computed(() => Object.entries(formRecord.value || {}))

const filteredWords = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return words.value.filter(word =>
    !query ||
    String(word.word || '').toLowerCase().includes(query) ||
    word.id.toLowerCase().includes(query)
  )
})

function fieldLabel(key: string): string {
  const labels: Record<string, string> = {
    content: 'İçerik',
    en_meta_desc: 'İngilizce SEO açıklaması',
    id: 'URL kısa adı',
    img: 'Görsel yolu',
    img_height: 'Görsel yüksekliği',
    img_width: 'Görsel genişliği',
    'related-words': 'İlgili kelimeler',
    related_words: 'İlgili kelimeler',
    word: 'Kelime'
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
}

async function loadWords() {
  words.value = await $fetch<WordRecord[]>('/api/admin/words')
}

async function login() {
  clearMessages()
  busy.value = true
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: credentials })
    authenticated.value = true
    credentials.password = ''
    await loadWords()
    startNewWord()
  } catch {
    errorMessage.value = 'Giriş başarısız. Kullanıcı adı ve şifrenizi kontrol edin.'
  } finally {
    busy.value = false
  }
}

async function logout() {
  clearMessages()
  try {
    await $fetch('/api/admin/logout', { method: 'POST' })
    authenticated.value = false
    words.value = []
    formRecord.value = null
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Oturum kapatılamadı.'
  }
}

function newWordTemplate(): WordRecord {
  return {
    content: '',
    en_meta_desc: '',
    id: '',
    img: '',
    img_height: '',
    img_width: '',
    'related-words': '',
    word: ''
  }
}

function startNewWord() {
  clearMessages()
  jsonError.value = ''
  previousId.value = null
  formRecord.value = newWordTemplate()
  clearJsonValues()
}

function editWord(word: WordRecord) {
  clearMessages()
  jsonError.value = ''
  previousId.value = word.id
  formRecord.value = structuredClone(word)
  clearJsonValues()
}

function updateField(key: string, rawValue: string) {
  if (!formRecord.value) return
  const original = formRecord.value[key]
  formRecord.value[key] = typeof original === 'number' && rawValue !== ''
    ? Number(rawValue)
    : rawValue
}

function updateArrayField(key: string, rawValue: string) {
  if (!formRecord.value) return
  formRecord.value[key] = rawValue.split(',').map(value => value.trim()).filter(Boolean)
}

function updateJsonField(key: string, rawValue: string) {
  if (!formRecord.value) return
  jsonValues[key] = rawValue
  try {
    formRecord.value[key] = JSON.parse(rawValue)
    jsonError.value = ''
  } catch {
    jsonError.value = `${fieldLabel(key)} geçerli JSON olmalıdır.`
  }
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function saveWord() {
  if (!formRecord.value) return
  clearMessages()
  if (jsonError.value) {
    errorMessage.value = jsonError.value
    return
  }
  const record = structuredClone(formRecord.value)

  if (!record.id) {
    record.id = slugify(String(record.word || ''))
    formRecord.value.id = record.id
  }

  busy.value = true
  try {
    await $fetch('/api/admin/words', {
      method: 'PUT',
      body: { previousId: previousId.value, record }
    })
    await loadWords()
    previousId.value = record.id
    formRecord.value = structuredClone(words.value.find(word => word.id === record.id)!)
    successMessage.value = 'Kelime başarıyla kaydedildi.'
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Kelime kaydedilemedi.'
  } finally {
    busy.value = false
  }
}

onMounted(async () => {
  try {
    await $fetch('/api/admin/session')
    authenticated.value = true
    await loadWords()
    startNewWord()
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode !== 401) {
      errorMessage.value = 'Yönetici API’sine bağlanılamadı.'
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
  font-weight: 600;
}

.form-grid input,
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

.admin-header p {
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

.word-form h2 {
  margin: 0 0 4px;
}

.save-button {
  justify-self: start;
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
