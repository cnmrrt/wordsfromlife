<template>
  <Navbar />

  <div class="words-container">
    <header class="words-header">
      <h1>English Words of French Origin</h1>
    </header>

    <main class="table-wrapper">
      <table class="words-table">
        <thead>
          <tr>
            <th>English Word</th>
            <th>Original French Word</th>
            <th>Meaning / Context</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredWords.length === 0">
            <td colspan="3" class="no-results">
              No matching words found.
            </td>
          </tr>
          <tr
            v-for="item in filteredWords"
            :key="item.id"
            :id="item.id"
          >
            <td class="word-cell">
              <strong>{{ item.word }}</strong>
            </td>
            <td class="french-cell">
              <em>{{ item.french_origin }}</em>
            </td>
            <td class="meaning-cell">
              {{ item.meaning }}
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import { ref, computed } from 'vue'
import { useHead } from '#imports'

const searchQuery = ref('')

const wordsData = [
  { id: "very", word: "Very", french_origin: "verai", meaning: "True / real" },
  { id: "people", word: "People", french_origin: "peuple", meaning: "People" },
  { id: "city", word: "City", french_origin: "cité", meaning: "City" },
  { id: "change", word: "Change", french_origin: "changier", meaning: "To change" },
  { id: "question", word: "Question", french_origin: "question", meaning: "Question" },
  { id: "hour", word: "Hour", french_origin: "heure", meaning: "Hour" },
  { id: "pay", word: "Pay", french_origin: "paier", meaning: "To pay" },
  { id: "beef", word: "Beef", french_origin: "bœuf", meaning: "Cooked meat from cow" },
  { id: "pork", word: "Pork", french_origin: "porc", meaning: "Cooked meat from pig" },
  { id: "mutton", word: "Mutton", french_origin: "mouton", meaning: "Cooked meat from sheep" },
  { id: "veal", word: "Veal", french_origin: "veau", meaning: "Cooked meat from calf" },
  { id: "chef", word: "Chef", french_origin: "chef", meaning: "Chief / head cook" },
  { id: "restaurant", word: "Restaurant", french_origin: "restaurant", meaning: "Food establishment (restorative)" },
  { id: "dessert", word: "Dessert", french_origin: "desservir", meaning: "Final course (from 'to clear the table')" },
  { id: "government", word: "Government", french_origin: "gouvernement", meaning: "Governance" },
  { id: "parliament", word: "Parliament", french_origin: "parlement", meaning: "Legislative body (from parler – to speak)" },
  { id: "crown", word: "Crown", french_origin: "couronne", meaning: "Crown" },
  { id: "court", word: "Court", french_origin: "cort", meaning: "Judicial assembly / royal court" },
  { id: "judge", word: "Judge", french_origin: "juge", meaning: "Judge" },
  { id: "jury", word: "Jury", french_origin: "juré", meaning: "Sworn body of people" },
  { id: "attorney", word: "Attorney", french_origin: "atorné", meaning: "Appointed legal representative" },
  { id: "verdict", word: "Verdict", french_origin: "verdit", meaning: "Final decision ('true statement')" },
  { id: "costume", word: "Costume", french_origin: "costume", meaning: "Outfit / fashion style" },
  { id: "boutique", word: "Boutique", french_origin: "boutique", meaning: "Small specialized store" },
  { id: "jewelry", word: "Jewelry", french_origin: "jouel", meaning: "Decorative ornaments" },
  { id: "genre", word: "Genre", french_origin: "genre", meaning: "Kind / style of art or literature" },
  { id: "facade", word: "Facade", french_origin: "façade", meaning: "Front of a building / face" },
  { id: "ballet", word: "Ballet", french_origin: "ballet", meaning: "Form of dance" },
  { id: "entrepreneur", word: "Entrepreneur", french_origin: "entrepreneur", meaning: "Business founder ('one who undertakes')" },
  { id: "deja-vu", word: "Déjà vu", french_origin: "déjà vu", meaning: "Sense of past occurrence ('already seen')" },
  { id: "rendezvous", word: "Rendezvous", french_origin: "rendez-vous", meaning: "Scheduled meeting ('present yourselves')" },
  { id: "cliche", word: "Cliché", french_origin: "cliché", meaning: "Overused expression (originally a printing plate)" },
  { id: "faux-pas", word: "Faux pas", french_origin: "faux pas", meaning: "Social blunder ('false step')" },
  { id: "cul-de-sac", word: "Cul-de-sac", french_origin: "cul-de-sac", meaning: "Dead-end street ('bottom of the bag')" },
  { id: "carte-blanche", word: "Carte blanche", french_origin: "carte blanche", meaning: "Unlimited freedom ('blank document')" }
]

const filteredWords = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return wordsData

  return wordsData.filter(item =>
    item.word.toLowerCase().includes(query) ||
    item.french_origin.toLowerCase().includes(query) ||
    item.meaning.toLowerCase().includes(query)
  )
})


useHead({
  
  title: 'Popular English Words of French Origin',
  meta: [
    {
      name: 'description',
      content: 'A comprehensive table of popular English words derived from French, including culinary, legal, political, and daily vocabulary.'
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: 'Popular English Words of French Origin' },
    {
      property: 'og:description',
      content: 'A comprehensive table of popular English words derived from French, including culinary, legal, political, and daily vocabulary.'
    },
    { property: 'og:url', content: 'https://wordsfromlife.com/words/english-words-origin-french' }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://wordsfromlife.com/words/english-words-origin-french'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://wordsfromlife.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Words',
            item: 'https://wordsfromlife.com/words'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'English Words of French Origin',
            item: 'https://wordsfromlife.com/words/english-words-origin-french'
          }
        ]
      }).replace(/</g, '\\u003c')
    }
  ]
})
</script>

<style scoped>
.words-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.words-header {
  text-align: center;
  margin-bottom: 2rem;
}

.words-header h1 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.controls {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
}
table {margin: 0 !important;}
.table-wrapper {
  overflow-x: auto;
  background: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.words-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.words-table th,
.words-table td {
  padding: 0.85rem 1.2rem;
  border-bottom: 1px solid #edf2f7;
}

.words-table th {
  background-color: #f8fafc;
  color: #475569;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.words-table tbody tr:hover {
  background-color: #f8fafc;
}

.word-cell {
  color: #1e293b;
  font-size: 1.05rem;
}

.french-cell {
  color: #0369a1;
  font-weight: 500;
}

.meaning-cell {
  color: #334155;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #94a3b8;
  font-size: 1.05rem;
}

@media (max-width: 640px) {
  .words-table th,
  .words-table td {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>