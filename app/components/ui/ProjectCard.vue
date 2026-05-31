<template>
  <div class="card" :class="{ expanded }">
    <div class="card-top" @click="expanded = !expanded">
      <div class="card-meta">
        <span v-if="project.period" class="card-period">{{ project.period }}</span>
        <div class="spacer" />
        <Icon name="ph:caret-down" class="caret" :class="{ rotated: expanded }" size="16" />
      </div>

      <div class="card-title-row">
        <h3 class="card-title">{{ project.title }}</h3>
        <div class="card-links" @click.stop>
          <NuxtLink :to="`/projects/${project.id}`" class="card-link detail-link">
            <Icon name="ph:arrow-right" size="12" /> Details
          </NuxtLink>
          <a v-if="project.links?.github" :href="project.links.github" target="_blank" rel="noopener noreferrer" class="card-link">
            <Icon name="ph:github-logo" size="12" /> GitHub
          </a>
          <a v-if="project.links?.demo" :href="project.links.demo" target="_blank" rel="noopener noreferrer" class="card-link">
            <Icon name="ph:arrow-square-out" size="12" /> Demo
          </a>
          <a v-if="project.links?.paper" :href="project.links.paper" target="_blank" rel="noopener noreferrer" class="card-link">
            <Icon name="ph:file-text" size="12" /> Paper
          </a>
        </div>
      </div>

      <p v-if="project.institution" class="card-institution">{{ project.institution }}</p>
      <p class="card-summary">{{ project.summary }}</p>

      <div v-if="project.stats?.length" class="card-stats">
        <div v-for="s in project.stats" :key="s.label" class="stat-item">
          <span class="stat-value">{{ s.value }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>

      <div class="card-stack">
        <span v-for="tech in project.stack" :key="tech" class="stack-tag">{{ tech }}</span>
      </div>
    </div>

    <div class="card-expand" v-show="expanded">
      <ul class="card-highlights">
        <li v-for="(h, i) in project.highlights" :key="i">{{ h }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio'
defineProps<{ project: Project }>()
const expanded = ref(false)
</script>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 3px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.card:hover,
.card.expanded {
  border-color: var(--text-muted);
}

.card-top {
  padding: 1.25rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.spacer { flex: 1; }

.caret {
  color: var(--text-muted);
  transition: transform 0.25s ease;
  flex-shrink: 0;
}
.caret.rotated { transform: rotate(180deg); }

/* ── Title row with inline links ── */
.card-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
  flex: 1;
  min-width: 0;
}

.card-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  flex-shrink: 0;
  align-self: flex-start;
}

.card-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  border: 1px solid var(--accent-1);
  color: var(--accent-1);
  background: var(--accent-1-sub);
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
}

.card-link:hover {
  background: var(--accent-1);
  color: #fff;
}

.card-period {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.card-institution {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.card-summary {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-stats {
  display: flex;
  gap: 1.5rem;
  padding: 0.75rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.stat-value {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text);
  line-height: 1;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.card-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.stack-tag {
  font-size: 0.68rem;
  padding: 0.18rem 0.5rem;
  border-radius: 3px;
  background: var(--surface-2);
  color: var(--text-muted);
  border: 1px solid var(--border);
  font-family: monospace;
}

.card-expand {
  padding: 1rem 1.25rem 1.25rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-highlights {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.card-highlights li {
  font-size: 0.8rem;
  color: var(--text-muted);
  padding-left: 1rem;
  position: relative;
  line-height: 1.5;
}

.card-highlights li::before {
  content: '›';
  position: absolute;
  left: 0;
  color: var(--accent-2);
}
</style>
