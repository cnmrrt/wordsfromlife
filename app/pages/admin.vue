<template>
  <main class="admin-page">
    <section v-if="!authenticated" class="login-panel">
      <h1>Yönetici Girişi</h1>
      <form class="admin-form" @submit.prevent="login">
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
          <h1>İçerik Yönetimi</h1>
          <p>Değişiklikler yerel JSON dosyalarına kaydedilir.</p>
        </div>
        <button type="button" class="secondary-button" @click="logout">Çıkış yap</button>
      </header>

      <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message" role="status">{{ successMessage }}</p>

      <div class="editor-layout">
        <aside class="record-sidebar">
          <label>
            İçerik türü
            <select v-model="collection" @change="startNewRecord">
              <option value="words">Kelimeler</option>
              <option value="authors">Yazarlar</option>
              <option value="proverbs">Atasözleri</option>
            </select>
          </label>
          <button type="button" class="primary-button" @click="startNewRecord">Yeni kayıt ekle</button>
          <label>
            Ara
            <input v-model="searchQuery" type="search" placeholder="Kayıtlarda ara">
          </label>
          <div class="record-list">
            <button
              v-for="record in filteredRecords"
              :key="record.id"
              type="button"
              class="record-item"
              :class="{ selected: formRecord?.id === record.id && previousId === record.id }"
              @click="editRecord(record)"
            >
              <strong>{{ recordTitle(record) }}</strong>
              <small>{{ record.id }}</small>
            </button>
          </div>
        </aside>

        <form v-if="formRecord" class="record-editor admin-form" @submit.prevent="saveRecord">
          <h2>{{ previousId === null ? 'Yeni kayıt' : `Düzenle: ${recordTitle(formRecord)}` }}</h2>
          <template v-for="(value, key) in formRecord" :key="key">
            <label v-if="key === 'content'">
              İçerik
              <AdminRichTextEditor
                :model-value="String(value || '')"
                @update:model-value="updateField(key, $event)"
              />
            </label>

            <fieldset v-else-if="isQuoteList(key)" class="quote-list">
              <legend>{{ fieldLabel(key) }}</legend>
              <div v-for="(quote, index) in quoteValues(value)" :key="index" class="quote-editor">
                <AdminRichTextEditor
                  :model-value="quote"
                  @update:model-value="updateQuote(key, index, $event)"
                />
                <button
                  type="button"
                  class="remove-button"
                  :aria-label="`${fieldLabel(key)} ${index + 1} kaydını kaldır`"
                  @click="removeQuote(key, index)"
                >
                  Kaldır
                </button>
              </div>
              <button type="button" class="secondary-button" @click="addQuote(key)">Alıntı ekle</button>
            </fieldset>

            <label v-else-if="Array.isArray(value)">
              {{ fieldLabel(key) }} <span class="field-hint">(virgülle ayırın)</span>
              <input
                :value="value.join(', ')"
                @input="updateArrayField(key, ($event.target as HTMLInputElement).value)"
              >
            </label>

            <label v-else>
              {{ fieldLabel(key) }}
              <textarea
                v-if="typeof value === 'object' && value !== null"
                :value="JSON.stringify(value, null, 2)"
                rows="4"
                @change="updateJsonField(key, ($event.target as HTMLTextAreaElement).value)"
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
            {{ busy ? 'Kaydediliyor…' : 'Değişiklikleri kaydet' }}
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import AdminRichTextEditor from '~/components/AdminRichTextEditor.vue'

type Collection = 'words' | 'authors' | 'proverbs'
type ContentRecord = Record<string, unknown> & { id: string }
type ContentSets = Record<Collection, ContentRecord[]>

const collection = ref<Collection>('words')
const records = ref<ContentSets>({ words: [], authors: [], proverbs: [] })
const authenticated = ref(false)
const busy = ref(false)
const searchQuery = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const previousId = ref<string | null>(null)
const formRecord = ref<ContentRecord | null>(null)
const credentials = reactive({ username: '', password: '' })

const filteredRecords = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return records.value[collection.value].filter(record => {
    const title = recordTitle(record).toLowerCase()
    return !query || title.includes(query) || record.id.toLowerCase().includes(query)
  })
})

function recordTitle(record: ContentRecord): string {
  if (collection.value === 'authors') {
    return `${record.name || ''} ${record.surname || ''}`.trim() || '(untitled author)'
  }
  const titleField = collection.value === 'words' ? 'word' : 'preverb'
  return String(record[titleField] || '(untitled)')
}

function fieldLabel(key: string): string {
  const labels: Record<string, string> = {
    born: 'Doğum yılı',
    dead: 'Ölüm yılı',
    en_meta_desc: 'İngilizce SEO açıklaması',
    en_quotes: 'İngilizce alıntılar',
    id: 'URL kısa adı',
    img: 'Görsel yolu',
    img_height: 'Görsel yüksekliği',
    img_width: 'Görsel genişliği',
    name: 'Ad',
    preverb: 'Atasözü',
    related_person: 'İlgili kişiler',
    'related-person': 'İlgili kişiler',
    'related-words': 'İlgili kelimeler',
    surname: 'Soyad',
    tr_meta_desc: 'Türkçe SEO açıklaması',
    tr_quotes: 'Türkçe alıntılar',
    word: 'Kelime'
  }
  if (labels[key]) return labels[key]
  return key.replaceAll(/[-_]/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase())
}

function isQuoteList(key: string): boolean {
  return collection.value === 'authors' && (key === 'en_quotes' || key === 'tr_quotes')
}

function quoteValues(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String)
  return typeof value === 'string' && value ? [value] : []
}

function clearMessages() {
  errorMessage.value = ''
  successMessage.value = ''
}

async function loadRecords() {
  records.value = await $fetch<ContentSets>('/api/admin/content')
}

async function login() {
  clearMessages()
  busy.value = true
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: credentials })
    authenticated.value = true
    credentials.password = ''
    await loadRecords()
    startNewRecord()
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
    formRecord.value = null
    records.value = { words: [], authors: [], proverbs: [] }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Oturum kapatılamadı.'
  }
}

function makeNewRecord(): ContentRecord {
  const sample = records.value[collection.value][0]
  const record: Record<string, unknown> = {}

  if (sample) {
    for (const [key, value] of Object.entries(sample)) {
      if (key === 'id') {
        record[key] = ''
      } else if (Array.isArray(value)) {
        record[key] = []
      } else if (typeof value === 'number') {
        record[key] = ''
      } else if (typeof value === 'boolean') {
        record[key] = false
      } else {
        record[key] = ''
      }
    }
  }

  if (collection.value === 'authors') {
    Object.assign(record, {
      born: '',
      dead: '',
      en_meta_desc: '',
      en_quotes: [],
      img: '',
      img_height: '',
      img_width: '',
      id: '',
      name: '',
      surname: '',
      tr_meta_desc: '',
      tr_quotes: []
    })
  } else {
    Object.assign(record, {
      content: '',
      en_meta_desc: '',
      id: '',
      img: '',
      img_height: '',
      img_width: '',
      ...(collection.value === 'words' ? { 'related-words': '' } : {}),
      [collection.value === 'words' ? 'word' : 'preverb']: ''
    })
    delete record.im_height
  }

  return record as ContentRecord
}

function startNewRecord() {
  clearMessages()
  previousId.value = null
  formRecord.value = makeNewRecord()
}

function editRecord(record: ContentRecord) {
  clearMessages()
  previousId.value = record.id
  formRecord.value = structuredClone(record)
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

function updateQuote(key: string, index: number, value: string) {
  if (!formRecord.value) return
  const quotes = quoteValues(formRecord.value[key])
  quotes[index] = value
  formRecord.value[key] = quotes
}

function addQuote(key: string) {
  if (!formRecord.value) return
  formRecord.value[key] = [...quoteValues(formRecord.value[key]), '']
}

function removeQuote(key: string, index: number) {
  if (!formRecord.value) return
  formRecord.value[key] = quoteValues(formRecord.value[key]).filter((_, quoteIndex) => quoteIndex !== index)
}

function updateJsonField(key: string, rawValue: string) {
  if (!formRecord.value) return
  try {
    formRecord.value[key] = JSON.parse(rawValue)
    errorMessage.value = ''
  } catch {
    errorMessage.value = `${fieldLabel(key)} geçerli JSON olmalıdır.`
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

async function saveRecord() {
  if (!formRecord.value) return
  clearMessages()
  const payload = structuredClone(formRecord.value)

  if (!payload.id) {
    const title = collection.value === 'authors'
      ? `${payload.name || ''} ${payload.surname || ''}`
      : String(payload[collection.value === 'words' ? 'word' : 'preverb'] || '')
    payload.id = slugify(title)
    if (formRecord.value) formRecord.value.id = payload.id
  }

  busy.value = true
  try {
    await $fetch('/api/admin/content', {
      method: 'PUT',
      body: { collection: collection.value, previousId: previousId.value, record: payload }
    })
    await loadRecords()
    previousId.value = payload.id
    formRecord.value = structuredClone(records.value[collection.value].find(record => record.id === payload.id)!)
    successMessage.value = 'Başarıyla kaydedildi.'
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Kayıt kaydedilemedi.'
  } finally {
    busy.value = false
  }
}

onMounted(async () => {
  try {
    await $fetch('/api/admin/session')
    authenticated.value = true
    await loadRecords()
    startNewRecord()
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

.admin-form {
  display: grid;
  gap: 16px;
}

.admin-form label,
.record-sidebar label {
  display: grid;
  gap: 6px;
  font-weight: 600;
}

.admin-form input,
.admin-form textarea,
.record-sidebar input,
.record-sidebar select {
  width: 100%;
  min-height: 40px;
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  background: white;
  font: inherit;
}

.admin-form textarea {
  resize: vertical;
}

.primary-button,
.secondary-button,
.remove-button {
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

.remove-button {
  justify-self: start;
  min-height: 32px;
  background: #fee2e2;
  color: #991b1b;
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

.record-sidebar {
  display: grid;
  align-content: start;
  gap: 14px;
}

.record-list {
  display: grid;
  max-height: 65vh;
  overflow: auto;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.record-item {
  display: grid;
  gap: 3px;
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #e2e8f0;
  background: white;
  text-align: left;
  cursor: pointer;
}

.record-item:last-child {
  border-bottom: 0;
}

.record-item.selected {
  background: #eff6ff;
}

.record-item small,
.field-hint {
  color: #64748b;
  font-size: 12px;
  font-weight: 400;
}

.record-editor {
  min-width: 0;
}

.record-editor h2 {
  margin: 0 0 4px;
}

.quote-list {
  display: grid;
  gap: 14px;
  min-width: 0;
  margin: 0;
  padding: 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

.quote-list legend {
  padding: 0 6px;
  font-weight: 700;
}

.quote-editor {
  display: grid;
  gap: 6px;
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

  .record-list {
    max-height: 240px;
  }
}
</style>
