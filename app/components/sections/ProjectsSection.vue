<template>
  <section id="projects" class="section">
    <div class="container">
      <h2 class="section-title">Projects</h2>

      <div v-if="projects" class="type-groups">
        <div
          v-for="group in groups"
          :key="group.type"
          class="type-group"
        >
          <div class="type-header">
            <span class="type-label" :class="`label-${group.type}`">{{ group.type }}</span>
            <span class="type-count">{{ group.items.length }}</span>
          </div>
          <div class="cards-grid">
            <ProjectCard
              v-for="p in group.items"
              :key="p.id"
              :project="p"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio'

const { data: projects } = await useProjects()

const TYPE_ORDER = ['research', 'industrial', 'software'] as const

const groups = computed(() =>
  TYPE_ORDER
    .map(type => ({
      type,
      items: projects.value?.filter(p => p.type === type) ?? [],
    }))
    .filter(g => g.items.length > 0)
)
</script>

<style scoped>
.type-groups {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.type-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.type-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.type-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 0.2rem 0.65rem;
  border-radius: 3px;
}

.label-research  { background: var(--accent-1-sub); color: var(--accent-1); border: 1px solid var(--accent-1-sub); }
.label-industrial{ background: var(--accent-1-sub); color: var(--accent-1);        border: 1px solid var(--accent-1-sub); }
.label-software  { background: var(--accent-2-sub); color: var(--accent-2); border: 1px solid var(--accent-2-sub); }

.type-count {
  font-size: 0.7rem;
  color: var(--text-muted);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 99px;
  padding: 0.05rem 0.45rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
