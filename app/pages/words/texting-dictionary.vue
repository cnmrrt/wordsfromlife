<template>
  <div>
    <Navbar />

    <main class="dictionary-page">
      <header class="dictionary-header">
        <h1>Texting Dictionary: Text and Chat Abbreviations</h1>
        <p>
          Quickly look up common abbreviations used in text messages, online chats, and social media.
        </p>
        <label class="search-label" for="abbreviation-search">Search abbreviations</label>
        <input
          id="abbreviation-search"
          v-model="searchQuery"
          class="search-input"
          type="search"
          placeholder="Search an abbreviation or meaning..."
        >
      </header>

      <section class="dictionary-content" aria-label="Texting abbreviations">
        <p v-if="filteredAbbreviations.length === 0" class="no-results">
          No matching abbreviations found.
        </p>
        <div v-else class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th scope="col">Abbreviation</th>
                <th scope="col">Stands for</th>
                <th scope="col">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredAbbreviations" :key="item.short">
                <th scope="row">{{ item.short }}</th>
                <td>{{ item.full }}</td>
                <td>{{ item.meaning }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Navbar from '~/components/Navbar.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

const searchQuery = ref('')

const abbreviations = [
  { short: 'AFK', full: 'Away from keyboard', meaning: 'I am temporarily not at my computer or device.' },
  { short: 'AFAIK', full: 'As far as I know', meaning: 'Used to qualify information that may not be complete.' },
  { short: 'AMA', full: 'Ask me anything', meaning: 'An invitation for people to ask questions.' },
  { short: 'ASAP', full: 'As soon as possible', meaning: 'Please do this at the earliest opportunity.' },
  { short: 'ATM', full: 'At the moment', meaning: 'Right now or currently.' },
  { short: 'B4', full: 'Before', meaning: 'A shortened spelling of “before.”' },
  { short: 'BFF', full: 'Best friends forever', meaning: 'A very close or longtime friend.' },
  { short: 'BRB', full: 'Be right back', meaning: 'I will return shortly.' },
  { short: 'BTW', full: 'By the way', meaning: 'Used to introduce an additional or related point.' },
  { short: 'DM', full: 'Direct message', meaning: 'A private message sent through a social platform.' },
  { short: 'FOMO', full: 'Fear of missing out', meaning: 'Worry that others are having an enjoyable experience without you.' },
  { short: 'FTW', full: 'For the win', meaning: 'An enthusiastic way to show approval or support.' },
  { short: 'FWIW', full: 'For what it’s worth', meaning: 'Introduces an opinion or information offered for consideration.' },
  { short: 'FYI', full: 'For your information', meaning: 'Shares information that may be useful to the recipient.' },
  { short: 'G2G / GTG', full: 'Got to go', meaning: 'I need to leave or end the conversation.' },
  { short: 'GG', full: 'Good game', meaning: 'A friendly comment after a game or competition.' },
  { short: 'HBD', full: 'Happy birthday', meaning: 'A short birthday greeting.' },
  { short: 'HBU', full: 'How about you?', meaning: 'Asks the other person the same question.' },
  { short: 'HMU', full: 'Hit me up', meaning: 'Contact me or get in touch.' },
  { short: 'IDC', full: 'I don’t care', meaning: 'Shows that something is not important to the speaker.' },
  { short: 'IDK', full: 'I don’t know', meaning: 'The sender does not know the answer or information.' },
  { short: 'IKR', full: 'I know, right?', meaning: 'Expresses agreement or shared surprise.' },
  { short: 'ILY', full: 'I love you', meaning: 'A shortened expression of affection.' },
  { short: 'IMO', full: 'In my opinion', meaning: 'Marks a statement as the sender’s personal view.' },
  { short: 'IMHO', full: 'In my humble opinion', meaning: 'A modest or softened way to introduce an opinion.' },
  { short: 'IRL', full: 'In real life', meaning: 'Outside the internet or online environment.' },
  { short: 'JK', full: 'Just kidding', meaning: 'Clarifies that a comment was meant as a joke.' },
  { short: 'L8R', full: 'Later', meaning: 'A casual way to say goodbye or “see you later.”' },
  { short: 'LMK', full: 'Let me know', meaning: 'Please tell me when you have an answer or update.' },
  { short: 'LOL', full: 'Laughing out loud', meaning: 'Shows that something is funny or amusing.' },
  { short: 'LMAO', full: 'Laughing my ass off', meaning: 'An informal, emphatic way to say something is very funny.' },
  { short: 'NGL', full: 'Not gonna lie', meaning: 'Introduces a frank or candid statement.' },
  { short: 'NM', full: 'Never mind', meaning: 'Indicates that something can be disregarded or is no longer needed.' },
  { short: 'NP', full: 'No problem', meaning: 'A casual response meaning “you’re welcome” or “that’s okay.”' },
  { short: 'NVM', full: 'Never mind', meaning: 'Asks someone to disregard a previous message or request.' },
  { short: 'OMG', full: 'Oh my God', meaning: 'Expresses surprise, excitement, or disbelief.' },
  { short: 'OMW', full: 'On my way', meaning: 'I am travelling to the place we discussed.' },
  { short: 'OTOH', full: 'On the other hand', meaning: 'Introduces a contrasting point or alternative view.' },
  { short: 'RN', full: 'Right now', meaning: 'At this moment.' },
  { short: 'ROFL', full: 'Rolling on the floor laughing', meaning: 'A playful way to say something is extremely funny.' },
  { short: 'SMH', full: 'Shaking my head', meaning: 'Shows disappointment, disbelief, or disapproval.' },
  { short: 'TBH', full: 'To be honest', meaning: 'Introduces a sincere or direct opinion.' },
  { short: 'TBF', full: 'To be fair', meaning: 'Introduces a balancing point or fair consideration.' },
  { short: 'TMI', full: 'Too much information', meaning: 'Says that a detail is more personal or graphic than wanted.' },
  { short: 'TL;DR', full: 'Too long; didn’t read', meaning: 'A summary of a long text or post.' },
  { short: 'TTYL', full: 'Talk to you later', meaning: 'A casual way to end a conversation for now.' },
  { short: 'WYD', full: 'What are you doing?', meaning: 'Asks what someone is doing at that moment.' },
  { short: 'WYM', full: 'What do you mean?', meaning: 'Asks someone to explain or clarify what they said.' },
  { short: 'YOLO', full: 'You only live once', meaning: 'A phrase used to encourage enjoying a moment or taking a chance.' },
  { short: 'YW', full: 'You’re welcome', meaning: 'A casual reply to “thank you.”' }
]

const filteredAbbreviations = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return abbreviations

  return abbreviations.filter(({ short, full, meaning }) =>
    `${short} ${full} ${meaning}`.toLowerCase().includes(query)
  )
})

useHead(createPageSeoHead({
  title: 'Texting Dictionary: Text and Chat Abbreviations',
  description: 'Look up common texting and chat abbreviations, what they stand for, and how they are used.',
  path: '/words/texting-dictionary',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Words', path: '/words' },
    { name: 'Texting Dictionary', path: '/words/texting-dictionary' }
  ]
}))
</script>

<style scoped>
.dictionary-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
}

.dictionary-header {
  max-width: 760px;
  margin: 0 auto 2rem;
  text-align: center;
}

.dictionary-header h1 {
  margin-bottom: 1rem;
}

.dictionary-header p {
  margin: 0 0 1.5rem;
}

.search-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.search-input {
  width: min(100%, 520px);
  padding: 0.75rem 1rem;
  border: 1px solid #bbb;
  border-radius: 4px;
  font: inherit;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 0.75rem;
  border: 1px solid #d3d3d3;
  vertical-align: top;
}

thead th {
  background: #f5f5f5;
}

tbody th {
  white-space: nowrap;
}

.no-results {
  text-align: center;
  padding: 1rem;
}

@media (max-width: 600px) {
  th,
  td {
    padding: 0.6rem;
  }
}
</style>
