<template>
  <Navbar />

  <main class="story-page">
    <article class="story-article">
      <header class="story-header">
        <p class="eyebrow">Economic History</p>
        <h1>The Great Depression: Causes, Impact, and Recovery</h1>
        <p class="intro">
          The Great Depression was the most severe global economic downturn of
          the twentieth century. Beginning in 1929, it spread from the United
          States across industrialized nations and lasted through much of the
          1930s, until the mobilization for World War II. It brought bank
          failures, collapsing production and trade, mass unemployment, and
          widespread poverty.
        </p>
      </header>

      <section>
        <h2>Key Causes and Trigger Points</h2>
        <p>
          No single event caused the Great Depression. Financial instability,
          weaknesses in production and demand, and policy decisions combined to
          turn a downturn into a prolonged international crisis.
        </p>
        <ul>
          <li>
            <strong>The Wall Street Crash of 1929:</strong> After years of
            speculative investment and borrowing to buy stocks, the market
            plunged in October 1929. The collapse especially the panic of
            October 29, known as Black Tuesday destroyed enormous amounts of
            paper wealth and shook confidence.
          </li>
          <li>
            <strong>Banking Panics:</strong> Fearful depositors rushed to
            withdraw their money. Many banks could not meet these withdrawals,
            and thousands failed in the United States during the early 1930s,
            wiping out the savings of millions.
          </li>
          <li>
            <strong>Overproduction and Weak Demand:</strong> Farms and factories
            produced more goods than many people could afford to buy. Unsold
            inventories led businesses to cut production and lay off workers,
            further reducing demand.
          </li>
          <li>
            <strong>Protectionist Policies:</strong> The United States passed
            the Smoot-Hawley Tariff Act in 1930, raising tariffs on many
            imported goods. Other countries retaliated, contributing to a sharp
            contraction in international trade.
          </li>
          <li>
            <strong>The Gold Standard:</strong> Fixed exchange rates tied to
            gold constrained many central banks, limiting their ability to
            expand the money supply or lower interest rates quickly in response
            to deflation and economic contraction.
          </li>
        </ul>
      </section>

      <section>
        <h2>The Human and Social Impact</h2>
        <p>
          The economic collapse caused profound hardship in both urban and
          rural communities. The figures below describe the scale of the crisis;
          estimates vary by country, source, and method.
        </p>
        <div class="impact-table-wrapper">
          <table>
            <thead>
              <tr>
                <th scope="col">Measure</th>
                <th scope="col">Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">U.S. unemployment</th>
                <td>
                  Reached about 25% in 1933, leaving more than 12 million
                  Americans out of work. In Germany, unemployment exceeded 30%
                  at its peak.
                </td>
              </tr>
              <tr>
                <th scope="row">U.S. GDP</th>
                <td>
                  Fell by roughly 30% between 1929 and 1933, depending on the
                  measure used.
                </td>
              </tr>
              <tr>
                <th scope="row">World trade</th>
                <td>
                  Contracted dramatically; estimates commonly put the decline
                  at around two-thirds in value between 1929 and 1934.
                </td>
              </tr>
              <tr>
                <th scope="row">Agriculture</th>
                <td>
                  Crop prices plunged. In the U.S. Great Plains, severe drought
                  and poor land practices contributed to the Dust Bowl,
                  displacing hundreds of thousands of farm families.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Millions of people lost their homes. Makeshift communities known as
          “Hoovervilles” appeared in the United States, while soup kitchens and
          breadlines became essential sources of food for many families.
        </p>
        <figure class="story-figure">
          <img
            src="https://wordsfromlife.com/static/img/story/great-depression-people-lined-up.webp"
            alt="People queue outside a free soup kitchen during the Great Depression"
          />
          <figcaption>
            A queue forms outside a free soup kitchen during the Great Depression.
          </figcaption>
        </figure>
      </section>

      <section>
        <h2>Recovery and Historical Legacy</h2>
        <ul>
          <li>
            <strong>The New Deal:</strong> After taking office in 1933,
            President Franklin D. Roosevelt introduced a series of programs
            aimed at relief, recovery, and reform. These included measures to
            stabilize banks and financial markets, as well as Social Security.
            The FDIC was created to insure bank deposits, and the SEC to
            regulate securities markets.
          </li>
          <li>
            <strong>A New Role for Government:</strong> The crisis changed
            economic debate and strengthened the case for government
            intervention and fiscal stimulus during severe downturns. It also
            influenced the development and application of Keynesian economic
            ideas.
          </li>
          <li>
            <strong>Mobilization for World War II:</strong> New Deal policies
            helped stabilize the economy and ease hardship, but they did not
            alone bring a full return to employment. The massive industrial
            mobilization for World War II drove production and employment to
            unprecedented levels.
          </li>
        </ul>
      </section>
    </article>
  </main>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import { createPageSeoHead } from '~/utils/pageSeo'

useHead(createPageSeoHead({
  title: 'The Great Depression: Causes, Impact, and Recovery | Words From Life',
  description: 'Learn what caused the Great Depression, how it affected people around the world, and how recovery reshaped economic policy.',
  path: '/story/the-great-depression',
  type: 'article',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Stories', path: '/story' },
    { name: 'The Great Depression', path: '/story/the-great-depression' }
  ]
}))
</script>

<style scoped>
.story-page {
  padding: 3rem 1.25rem 5rem;
}

.story-article {
  max-width: 760px;
  margin: 0 auto;
  color: #29323b;
}

.story-header {
  margin-bottom: 3rem;
  padding: 2rem 0 2.5rem;
  border-bottom: 1px solid #e8e3dc;
}

.eyebrow {
  margin: 0 0 0.75rem;
  color: #9a643e;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-align: center;
  text-transform: uppercase;
}

.story-header h1 {
  max-width: 680px;
  margin: 0 auto 1.5rem;
  color: #202a33;
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  line-height: 1.12;
}

.intro {
  margin: 0;
  color: #4a5661;
  font-size: 1.15rem;
  line-height: 1.8;
}

.story-article section {
  margin: 0 0 2.5rem;
}

.story-figure {
  margin: 1.5rem 0 2rem;
}

.story-figure img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
}

.story-figure figcaption {
  margin-top: 0.6rem;
  color: #69747d;
  font-size: 0.9rem;
  text-align: center;
}

.story-article h2 {
  margin: 0 0 1rem;
  color: #202a33;
  font-size: clamp(1.45rem, 3vw, 1.8rem);
  line-height: 1.3;
}

.story-article p,
.story-article li {
  font-size: 1.05rem;
  line-height: 1.8;
}

.story-article p {
  margin: 0 0 1rem;
}

.story-article ul {
  margin: 0 0 1.25rem;
  padding-left: 1.5rem;
}

.story-article li {
  padding-left: 0.25rem;
  margin-bottom: 0.8rem;
}

.story-article li::marker {
  color: #b8794a;
}

.impact-table-wrapper {
  margin: 1.5rem 0;
  overflow-x: auto;
  border-radius: 8px;
}

.impact-table-wrapper table {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  text-align: left;
}

.impact-table-wrapper th,
.impact-table-wrapper td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.98rem;
  line-height: 1.6;
  vertical-align: top;
}

.impact-table-wrapper thead th {
  color: #29323b;
  background: #f7f3ee;
}

.impact-table-wrapper tbody th {
  min-width: 150px;
}

.impact-table-wrapper tbody tr:last-child th,
.impact-table-wrapper tbody tr:last-child td {
  border-bottom: 0;
}

@media (max-width: 600px) {
  .story-page {
    padding: 1.5rem 1rem 3.5rem;
  }

  .story-header {
    margin-bottom: 2rem;
    padding: 1.25rem 0 2rem;
  }
}
</style>
