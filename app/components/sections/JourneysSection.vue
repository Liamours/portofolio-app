<template>
  <section id="journeys" class="section">
    <div class="container">
      <h2>Journeys</h2>

      <div v-for="entry in journeyList" :key="entry.config.key" class="journey-entry">
        <div v-if="entry.data">
          <h3>{{ entry.data.title }}</h3>
          <p>{{ entry.data.subtitle }}</p>

          <div v-for="(m, mi) in entry.data.milestones" :key="mi" class="milestone">
            <h4>{{ m.year }} — {{ m.role }}</h4>
            <ul>
              <li v-for="(h, hi) in m.highlights" :key="hi">{{ h }}</li>
            </ul>

            <ul v-if="m.publications?.length">
              <li v-for="(pub, pi) in m.publications" :key="pi">
                {{ pub.type }} ({{ pub.year }}): {{ pub.title }} — {{ pub.venue }}
                <span v-if="pub.link"> — <a :href="pub.link" target="_blank" rel="noopener noreferrer">Link</a></span>
              </li>
            </ul>

            <ul v-if="m.links?.length">
              <li v-for="link in m.links" :key="link.label">
                <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Journey } from '~/types/portfolio'

const configs = [
  { key: 'ailab',      label: 'AI Lab' },
  { key: 'wbbs',       label: 'WBBS' },
  { key: 'birdsound',  label: 'Bird Sound' },
  { key: 'transtrack', label: 'TransTrack' },
  { key: 'cxr',        label: 'CXR' },
]

const paths = [
  '/data/journey-ailab.json',
  '/data/journey-wbbs.json',
  '/data/journey-birdsound.json',
  '/data/journey-transtrack.json',
  '/data/journey-cxr.json',
]

const results = await Promise.all(paths.map(p => useFetch<Journey>(p)))
const journeyList = configs.map((config, i) => ({
  config,
  data: results[i].data.value,
}))
</script>

<style scoped>
.journey-entry + .journey-entry {
  margin-top: 3rem;
}

.milestone + .milestone {
  margin-top: 1.5rem;
}
</style>
