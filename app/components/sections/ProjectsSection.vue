<template>
  <section id="projects" class="section">
    <div class="container">
      <h2>Projects</h2>
      <ul v-if="featured.length" class="project-list">
        <ProjectCard v-for="p in featured" :key="p.id" :project="p" />
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio'

const { data: projects } = await useProjects()

const featured = computed<Project[]>(() =>
  (projects.value ?? []).filter(p => p.featured)
)
</script>

<style scoped>
.project-list {
  list-style: none;
  padding-left: 0;
}

.project-list :deep(.project-card + .project-card) {
  margin-top: 1.5rem;
}
</style>
