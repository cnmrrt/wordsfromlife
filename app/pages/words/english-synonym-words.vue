<template>
  <Navbar />

  <div class="words-container">
    <header class="words-header">
      <h1>List of English Synonyms Words</h1>
      <p class="subtitle">
        Expand your vocabulary with an expanded list of common English words and their most useful synonyms.
      </p>

      <!-- Search Bar -->
      <div class="controls">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search word, synonyms, or context..."
          class="search-input"
        />
      </div>
    </header>

    <main class="table-wrapper">
      <table class="words-table">
        <thead>
          <tr>
            <th>Word</th>
            <th>Synonyms</th>
            <th>Context / Meaning</th>
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
            <td class="synonym-cell">
              {{ item.synonyms }}
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
  { id: "accurate", word: "Accurate", synonyms: "Correct, Precise, Exact", meaning: "Free from error; conforming strictly to truth or fact" },
  { id: "acquire", word: "Acquire", synonyms: "Obtain, Gain, Procure", meaning: "To come into possession or ownership of something" },
  { id: "advocate", word: "Advocate", synonyms: "Champion, Support, Endorse", meaning: "To publicly recommend or support a cause or policy" },
  { id: "alleviate", word: "Alleviate", synonyms: "Relieve, Ease, Mitigate", meaning: "To make suffering, pain, or a problem less severe" },
  { id: "ambitious", word: "Ambitious", synonyms: "Aspiring, Driven, Determined", meaning: "Having a strong desire for success, power, or wealth" },
  { id: "ample", word: "Ample", synonyms: "Abundant, Plentiful, Copious", meaning: "More than enough; large or accommodating" },
  { id: "apparent", word: "Apparent", synonyms: "Obvious, Evident, Manifest", meaning: "Clearly visible or understood; obvious" },
  { id: "artificial", word: "Artificial", synonyms: "Synthetic, Man-made, Simulated", meaning: "Made or produced by human beings rather than occurring naturally" },
  { id: "assert", word: "Assert", synonyms: "Declare, State, Affirm", meaning: "To state a fact or belief confidently and forcefully" },
  { id: "assist", word: "Assist", synonyms: "Help, Aid, Support", meaning: "To give help or assistance to someone" },
  { id: "authentic", word: "Authentic", synonyms: "Genuine, Real, Legitimate", meaning: "Of undisputed origin; genuine" },
  { id: "baffle", word: "Baffle", synonyms: "Puzzle, Perplex, Confuse", meaning: "To totally bewilder or perplex someone" },
  { id: "benefit", word: "Benefit", synonyms: "Advantage, Profit, Gain", meaning: "An advantage or profit gained from something" },
  { id: "benevolent", word: "Benevolent", synonyms: "Kind, Generous, Charitable", meaning: "Well-meaning and kindly" },
  { id: "candid", word: "Candid", synonyms: "Frank, Honest, Outspoken", meaning: "Truthful and straightforward; frank" },
  { id: "capable", word: "Capable", synonyms: "Competent, Able, Skilled", meaning: "Having the ability, fitness, or quality necessary to do something" },
  { id: "clarify", word: "Clarify", synonyms: "Explain, Elucidate, Simplify", meaning: "To make a statement or situation less confused and more comprehensible" },
  { id: "coerce", word: "Coerce", synonyms: "Compel, Force, Pressurize", meaning: "To persuade an unwilling person to do something by using force or threats" },
  { id: "coherent", word: "Coherent", synonyms: "Logical, Consistent, Lucid", meaning: "Logical and consistent in thought or speech" },
  { id: "commence", word: "Commence", synonyms: "Begin, Start, Initiate", meaning: "To begin or start an action or event" },
  { id: "compelling", word: "Compelling", synonyms: "Captivating, Persuasive, Gripping", meaning: "Evoking interest, attention, or admiration in a powerfully irresistible way" },
  { id: "complex", word: "Complex", synonyms: "Complicated, Intricate, Elaborate", meaning: "Consisting of many different and connected parts" },
  { id: "concise", word: "Concise", synonyms: "Brief, Succinct, Compact", meaning: "Giving a lot of information clearly and in a few words" },
  { id: "concur", word: "Concur", synonyms: "Agree, Coincide, Assent", meaning: "To be of the same opinion; agree" },
  { id: "conspicuous", word: "Conspicuous", synonyms: "Noticeable, Prominent, Unmistakable", meaning: "Attracting notice or attention; clearly visible" },
  { id: "create", word: "Create", synonyms: "Produce, Generate, Form", meaning: "To bring something into existence" },
  { id: "crucial", word: "Crucial", synonyms: "Essential, Critical, Vital", meaning: "Decisive or critical, especially in the success or failure of something" },
  { id: "candid", word: "Curtail", synonyms: "Reduce, Shorten, Truncate", meaning: "To reduce in extent or quantity; impose a restriction on" },
  { id: "deliberate", word: "Deliberate", synonyms: "Intentional, Calculated, Conscious", meaning: "Done consciously and intentionally" },
  { id: "diligent", word: "Diligent", synonyms: "Hardworking, Industrious, Assiduous", meaning: "Having or showing care and conscientiousness in one's work" },
  { id: "diminish", word: "Diminish", synonyms: "Decrease, Reduce, Lessen", meaning: "To make or become less" },
  { id: "diverse", word: "Diverse", synonyms: "Varied, Distinct, Assorted", meaning: "Showing a great deal of variety; very different" },
  { id: "durable", word: "Durable", synonyms: "Long-lasting, Sturdy, Resilient", meaning: "Able to withstand wear, pressure, or damage" },
  { id: "eager", word: "Eager", synonyms: "Keen, Enthusiastic, Anxious", meaning: "Strongly wanting to do or have something" },
  { id: "eccentric", word: "Eccentric", synonyms: "Unconventional, Odd, Peculiar", meaning: "Unconventional and slightly strange" },
  { id: "eloquent", word: "Eloquent", synonyms: "Articulate, Expressive, Fluent", meaning: "Fluent or persuasive in speaking or writing" },
  { id: "elusive", word: "Elusive", synonyms: "Evasive, Slippery, Hard-to-find", meaning: "Difficult to find, catch, or achieve" },
  { id: "eminent", word: "Eminent", synonyms: "Distinguished, Prominent, Renowned", meaning: "Famous and respected within a particular sphere" },
  { id: "evaluate", word: "Evaluate", synonyms: "Assess, Appraise, Judge", meaning: "To form an idea of the amount, number, or value of something" },
  { id: "exemplary", word: "Exemplary", synonyms: "Model, Ideal, Commendable", meaning: "Serving as a desirable model; representing the best of its kind" },
  { id: "feasible", word: "Feasible", synonyms: "Possible, Practicable, Viable", meaning: "Possible to do easily or conveniently" },
  { id: "foster", word: "Foster", synonyms: "Nurture, Encourage, Promote", meaning: "To encourage the development or growth of something" },
  { id: "frugal", word: "Frugal", synonyms: "Thrifty, Economical, Sparing", meaning: "Sparing or economical with regard to money or food" },
  { id: "fundamental", word: "Fundamental", synonyms: "Basic, Essential, Primary", meaning: "Forming a necessary base or core; of central importance" },
  { id: "futile", word: "Futile", synonyms: "Pointless, Useless, Ineffective", meaning: "Incapable of producing any useful result; pointless" },
  { id: "generous", word: "Generous", synonyms: "Magnanimous, Open-handed, Charitable", meaning: "Showing readiness to give more of something than is strictly necessary" },
  { id: "genuine", word: "Genuine", synonyms: "Authentic, Real, Sincere", meaning: "Truly what something is said to be; authentic" },
  { id: "hinder", word: "Hinder", synonyms: "Impede, Obstruct, Hamper", meaning: "To create difficulties for someone or something, resulting in delay" },
  { id: "hostile", word: "Hostile", synonyms: "Unfriendly, Antagonistic, Aggressive", meaning: "Showing or feeling opposition or dislike; unfriendly" },
  { id: "illuminate", word: "Illuminate", synonyms: "Light up, Clarify, Enlighten", meaning: "To make something visible or bright with light, or clarify an idea" },
  { id: "immense", word: "Immense", synonyms: "Vast, Huge, Enormous", meaning: "Extremely large or great, especially in scale or degree" },
  { id: "impartial", word: "Impartial", synonyms: "Unbiased, Neutral, Fair", meaning: "Treating all rivals or disputants equally; fair and just" },
  { id: "impact", word: "Impact", synonyms: "Effect, Influence, Impression", meaning: "A marked effect or influence" },
  { id: "impeccable", word: "Impeccable", synonyms: "Flawless, Faultless, Perfect", meaning: "In accordance with the highest standards of propriety; faultless" },
  { id: "imperative", word: "Imperative", synonyms: "Essential, Crucial, Urgent", meaning: "Of vital importance; crucial" },
  { id: "indicate", word: "Indicate", synonyms: "Signify, Denote, Show", meaning: "To point out or show something" },
  { id: "indispensable", word: "Indispensable", synonyms: "Essential, Necessary, Vital", meaning: "Absolutely necessary; essential" },
  { id: "inevitable", word: "Inevitable", synonyms: "Unavoidable, Certain, Inescapable", meaning: "Certain to happen; unavoidable" },
  { id: "infamous", word: "Infamous", synonyms: "Notorious, Disreputable, Ill-famed", meaning: "Well known for some bad quality or deed" },
  { id: "innovative", word: "Innovative", synonyms: "Inventive, Original, Novel", meaning: "Featuring new methods; advanced and original" },
  { id: "intricate", word: "Intricate", synonyms: "Complex, Detailed, Complicated", meaning: "Very complicated or detailed" },
  { id: "lucid", word: "Lucid", synonyms: "Clear, Comprehensible, Understandable", meaning: "Expressed clearly; easy to understand" },
  { id: "magnify", word: "Magnify", synonyms: "Enlarge, Amplify, Intensify", meaning: "To make something appear larger or feel more significant" },
  { id: "meticulous", word: "Meticulous", synonyms: "Thorough, Precise, Painstaking", meaning: "Showing great attention to detail; very careful and precise" },
  { id: "negligible", word: "Negligible", synonyms: "Insignificant, Minor, Trivial", meaning: "So small or unimportant as to be not worth considering" },
  { id: "obscure", word: "Obscure", synonyms: "Vague, Ambiguous, Unclear", meaning: "Not discovered or known about; uncertain" },
  { id: "obsolete", word: "Obsolete", synonyms: "Outdated, Antiquated, Archaiac", meaning: "No longer produced or used; out of date" },
  { id: "perceive", word: "Perceive", synonyms: "Discern, Notice, Recognize", meaning: "To become aware or conscious of something" },
  { id: "plausible", word: "Plausible", synonyms: "Credible, Believable, Reasonable", meaning: "Seeming reasonable or probable" },
  { id: "pragmatic", word: "Pragmatic", synonyms: "Practical, Realistic, Sensible", meaning: "Dealing with things sensibly and realistically" },
  { id: "prominent", word: "Prominent", synonyms: "Famous, Well-known, Conspicuous", meaning: "Important; famous or particularly noticeable" },
  { id: "reluctant", word: "Reluctant", synonyms: "Hesitant, Unwilling, Disinclined", meaning: "Unwilling and hesitant to do something" },
  { id: "resilient", word: "Resilient", synonyms: "Tough, Adaptable, Robust", meaning: "Able to withstand or recover quickly from difficult conditions" },
  { id: "robust", word: "Robust", synonyms: "Sturdy, Strong, Resilient", meaning: "Strong and healthy; vigorous" },
  { id: "scrutinize", word: "Scrutinize", synonyms: "Inspect, Examine, Analyze", meaning: "To examine or inspect closely and thoroughly" },
  { id: "solitary", word: "Solitary", synonyms: "Lonely, Isolated, Single", meaning: "Done or existing alone" },
  { id: "substantial", word: "Substantial", synonyms: "Considerable, Significant, Sizable", meaning: "Of considerable importance, size, or worth" },
  { id: "subtle", word: "Subtle", synonyms: "Understated, Delicate, Nuanced", meaning: "So delicate or precise as to be difficult to analyze or describe" },
  { id: "tentative", word: "Tentative", synonyms: "Provisional, Uncertain, Hesitant", meaning: "Not certain or fixed; provisional" },
  { id: "versatile", word: "Versatile", synonyms: "Adaptable, Flexible, Multitalented", meaning: "Able to adapt or be adapted to many different functions or activities" }
]

const filteredWords = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return wordsData

  return wordsData.filter(item =>
    item.word.toLowerCase().includes(query) ||
    item.synonyms.toLowerCase().includes(query) ||
    item.meaning.toLowerCase().includes(query)
  )
})

useHead({
  title: 'English Synonym Words List',
  meta: [
    {
      name: 'description',
      content: 'A comprehensive list of popular English words, their synonyms, and meanings to help broaden your vocabulary.'
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: 'English Synonym Words List' },
    {
      property: 'og:description',
      content: 'A comprehensive list of popular English words, their synonyms, and meanings to help broaden your vocabulary.'
    },
    { property: 'og:url', content: 'https://wordsfromlife.com/english-synonym-words' }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://wordsfromlife.com/english-synonym-words'
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

.table-wrapper {
  overflow-x: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
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

.synonym-cell {
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