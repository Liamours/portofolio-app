<template>
  <section :id="sectionId" class="section">
    <div class="container">
      <h2 class="section-title">{{ journey.title }}</h2>
      <p class="journey-subtitle">{{ journey.subtitle }}</p>

      <div class="cards">
        <div
          v-for="(m, i) in journey.milestones"
          :key="m.year"
          class="milestone-card"
          :class="{ open: isOpen(i) }"
          @click="toggle(i)"
        >
          <div class="card-header">
            <div class="year-badge">{{ m.year }}</div>
            <span class="card-role">{{ m.role }}</span>
            <Icon
              name="ph:caret-down"
              size="16"
              class="caret"
              :class="{ rotated: isOpen(i) }"
            />
          </div>

          <div class="expand-wrap" :class="{ open: isOpen(i) }">
            <div class="card-body" @click.stop>
            <ul class="highlights">
              <li v-for="(h, j) in m.highlights" :key="j">{{ h }}</li>
            </ul>

            <div v-if="m.publications?.length" class="pub-section">
              <span class="pub-section-label">Publications</span>
              <div class="pub-cards">
                <a
                  v-for="(pub, k) in m.publications"
                  :key="k"
                  :href="pub.link || '#'"
                  :target="pub.link ? '_blank' : undefined"
                  rel="noopener noreferrer"
                  class="pub-card"
                  :class="[pub.link ? '' : 'no-link']"
                >
                  <div class="pub-accent" :class="`pub-type-${pub.type.toLowerCase().replace(/\s+/g, '-')}`" />
                  <div class="pub-info">
                    <div class="pub-meta">
                      <span class="pub-type-badge" :class="`pub-type-${pub.type.toLowerCase().replace(/\s+/g, '-')}`">{{ pub.type }}</span>
                      <span class="pub-year">{{ pub.year }}</span>
                    </div>
                    <p class="pub-title">{{ pub.title }}</p>
                    <p class="pub-venue">{{ pub.venue }}</p>
                  </div>
                </a>
              </div>
            </div>

            <div v-if="m.links" class="milestone-links">
              <a
                v-for="link in m.links"
                :key="link.label"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="milestone-link"
              >
                <Icon :name="link.icon" size="14" />
                {{ link.label }}
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Journey } from '~/types/portfolio'

defineProps<{
  journey: Journey
  sectionId: string
}>()

const openItems = ref<Set<number>>(new Set())
const toggle = (i: number) => {
  if (openItems.value.has(i)) openItems.value.delete(i)
  else openItems.value.add(i)
  openItems.value = new Set(openItems.value)
}
const isOpen = (i: number) => openItems.value.has(i)
</script>

<style scoped>
.journey-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  margin-top: -1.75rem;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* ── Card ── */
.milestone-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s;
}

.milestone-card:hover,
.milestone-card.open {
  border-color: var(--accent-1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
}

.year-badge {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.2rem 0.65rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.card-role {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text);
  flex: 1;
}

.caret {
  color: var(--text-muted);
  transition: transform 0.25s ease;
  flex-shrink: 0;
}
.caret.rotated { transform: rotate(180deg); }

/* ── Expand animation (grid trick) ── */
.expand-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.expand-wrap.open {
  grid-template-rows: 1fr;
}

/* ── Expanded body ── */
.card-body {
  overflow: hidden;
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid var(--border);
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.highlights {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.highlights li {
  font-size: 0.84rem;
  color: var(--text-muted);
  padding-left: 1rem;
  position: relative;
  line-height: 1.6;
}

.highlights li::before {
  content: '›';
  position: absolute;
  left: 0;
  color: var(--accent-2);
}

/* ── Publications ── */
.pub-section-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 0.6rem;
}

.pub-cards {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pub-card {
  display: flex;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.2s;
  text-decoration: none;
}

.pub-card:not(.no-link):hover {
  border-color: var(--text-muted);
}

.pub-accent {
  width: 3px;
  flex-shrink: 0;
}

.pub-type-conference-paper { background: var(--accent-1); }
.pub-type-journal-paper     { background: var(--accent-1); }
.pub-type-preprint          { background: var(--accent-1); }
.pub-type-dataset           { background: var(--accent-2); }
.pub-type-e-book            { background: var(--accent-1); }

.pub-info {
  padding: 0.65rem 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
}

.pub-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pub-type-badge {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.1rem 0.45rem;
  border-radius: 3px;
  border: 1px solid transparent;
}

.pub-type-badge.pub-type-conference-paper { color: var(--accent-1); background: var(--accent-1-sub); border-color: var(--accent-1-sub); }
.pub-type-badge.pub-type-journal-paper    { color: var(--accent-1); background: var(--accent-1-sub); border-color: var(--accent-1-sub); }
.pub-type-badge.pub-type-preprint         { color: var(--accent-1); background: var(--accent-1-sub); border-color: var(--accent-1-sub); }
.pub-type-badge.pub-type-dataset          { color: var(--accent-2); background: var(--accent-2-sub); border-color: var(--accent-2-sub); }
.pub-type-badge.pub-type-e-book           { color: var(--accent-1); background: var(--accent-1-sub); border-color: var(--accent-1-sub); }

.pub-year {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.pub-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.35;
}

.pub-venue {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* ── Links ── */
.milestone-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.milestone-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-muted);
  background: var(--surface);
  transition: border-color 0.2s, color 0.2s;
}

.milestone-link:hover {
  border-color: var(--accent-2);
  color: var(--accent-2);
}
</style>
