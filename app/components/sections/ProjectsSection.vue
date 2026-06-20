<template>
  <section id="projects" class="section">
    <div class="container">
      <h2>Projects</h2>

      <div v-if="projects">
        <div v-for="group in groups" :key="group.type" class="group">
          <h3>{{ group.type }} ({{ group.items.length }})</h3>
          <ul class="project-list">
            <ProjectCard
              v-for="p in group.items"
              :key="p.id"
              :project="p"
            />
          </ul>
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
.group + .group {
  margin-top: 2.5rem;
}

.project-list {
  list-style: none;
  padding-left: 0;
}

.project-list :deep(li + li) {
  margin-top: 1.5rem;
}
</style>
