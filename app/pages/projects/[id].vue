<template>
  <div class="detail-page">
    <NavBar />

    <main v-if="project" class="detail-main">
      <!-- Back -->
      <div class="container">
        <NuxtLink to="/#projects" class="back-link">
          <Icon name="ph:arrow-left" size="14" /> Projects
        </NuxtLink>
      </div>

      <!-- Header -->
      <div class="detail-hero">
        <div class="container">
          <div class="detail-meta">
            <span class="detail-type" :class="`type-${project.type}`">{{ project.type }}</span>
            <span v-if="project.period" class="detail-period">{{ project.period }}</span>
          </div>
          <h1 class="detail-title">{{ project.title }}</h1>
          <p v-if="project.institution" class="detail-institution">{{ project.institution }}</p>
          <p v-if="project.funding" class="detail-funding">{{ project.funding }}</p>
          <p class="detail-summary">{{ project.summary }}</p>

          <div v-if="project.links" class="detail-links">
            <a v-if="project.links.github" :href="project.links.github" target="_blank" rel="noopener noreferrer" class="detail-link">
              <Icon name="ph:github-logo" size="14" /> GitHub
            </a>
            <a v-if="project.links.demo" :href="project.links.demo" target="_blank" rel="noopener noreferrer" class="detail-link">
              <Icon name="ph:arrow-square-out" size="14" /> Demo
            </a>
            <a v-if="project.links.paper" :href="project.links.paper" target="_blank" rel="noopener noreferrer" class="detail-link">
              <Icon name="ph:file-text" size="14" /> Paper
            </a>
          </div>
        </div>
      </div>

      <!-- Highlights -->
      <div class="container detail-content">
        <section class="detail-section">
          <h2 class="detail-section-title">What we did</h2>
          <ul class="detail-highlights">
            <li v-for="(h, i) in project.highlights" :key="i">{{ h }}</li>
          </ul>
        </section>

        <!-- Stack -->
        <section class="detail-section">
          <h2 class="detail-section-title">Stack</h2>
          <div class="detail-stack">
            <span v-for="tech in project.stack" :key="tech" class="stack-tag">{{ tech }}</span>
          </div>
        </section>
      </div>
    </main>

    <!-- Not found -->
    <div v-else class="container" style="padding-top:8rem;">
      <p>Project not found. <NuxtLink to="/">Go home</NuxtLink></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio'

const route = useRoute()
const { data: projects } = await useProjects()

const project = computed<Project | null>(() =>
  projects.value?.find(p => p.id === route.params.id) ?? null
)

useHead({
  title: computed(() => project.value ? `${project.value.title} — Rifqi` : 'Project')
})
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: var(--bg);
}

.detail-main {
  padding-top: 60px;
}

/* Back link */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  padding: 1.5rem 0 0;
  transition: color 0.18s ease-out;
}
.back-link:hover { color: var(--text); }

/* Hero */
.detail-hero {
  padding: 2rem 2rem 3.5rem;
  border-bottom: 1px solid var(--border);
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.detail-type {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.2rem 0.6rem;
  border-radius: 2px;
  color: var(--text-muted);
  background: var(--surface-2);
  border: 1px solid var(--border);
}

.detail-period {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.detail-title {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 400;
  color: var(--text);
  line-height: 1.15;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
}

.detail-institution {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.detail-funding {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: 1.25rem;
}

.detail-summary {
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.7;
  max-width: 720px;
  margin-bottom: 1.5rem;
}

.detail-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.detail-link {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--accent-1);
  border-radius: 3px;
  color: var(--text);
  background: var(--accent-1-sub);
  transition: background 0.18s ease-out, transform 0.15s ease-out;
}
.detail-link:hover { transform: translateY(-1px); }

/* Content */
.detail-content {
  padding-top: 3rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.detail-section-title {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--text);
  margin-bottom: 1.25rem;
  letter-spacing: -0.01em;
}

.detail-highlights {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  max-width: 720px;
}

.detail-highlights li {
  font-size: 0.9rem;
  color: var(--text-muted);
  padding-left: 1.25rem;
  position: relative;
  line-height: 1.65;
}

.detail-highlights li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--border);
  font-size: 0.75rem;
}

.detail-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.stack-tag {
  font-size: 0.78rem;
  padding: 0.3rem 0.7rem;
  border-radius: 2px;
  background: var(--surface-2);
  color: var(--text-muted);
  border: 1px solid var(--border);
  font-family: monospace;
}
</style>
