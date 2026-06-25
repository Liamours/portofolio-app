<template>
  <div>
    <NavBar />

    <main v-if="project" class="container">
      <p><NuxtLink to="/#projects">← Projects</NuxtLink></p>

      <h1>{{ project.title }}</h1>
      <p>
        {{ project.type }}
        <span v-if="project.status"> · {{ project.status === 'in-progress' ? 'In Progress' : 'Planned' }}</span>
        <span v-if="project.period"> · {{ project.period }}</span>
      </p>
      <p v-if="project.institution">{{ project.institution }}</p>
      <p v-if="project.funding">{{ project.funding }}</p>

      <p>{{ project.summary }}</p>

      <div v-if="project.images?.length" class="images">
        <img v-for="img in project.images" :key="img" :src="img" :alt="project.title" />
      </div>

      <ul v-if="project.stats?.length">
        <li v-for="s in project.stats" :key="s.label">{{ s.label }}: {{ s.value }}</li>
      </ul>

      <ul>
        <li v-for="(h, i) in project.highlights" :key="i">{{ h }}</li>
      </ul>

      <p>Stack: {{ project.stack.join(', ') }}</p>

      <p>
        <span v-if="project.links?.github"><a :href="project.links.github" target="_blank" rel="noopener noreferrer">GitHub</a></span>
        <span v-if="project.links?.demo"> · <a :href="project.links.demo" target="_blank" rel="noopener noreferrer">Demo</a></span>
        <span v-if="project.links?.paper"> · <a :href="project.links.paper" target="_blank" rel="noopener noreferrer">Paper</a></span>
      </p>
    </main>

    <div v-else class="container">
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
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.images {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.images img {
  max-width: 100%;
  display: block;
}
</style>
