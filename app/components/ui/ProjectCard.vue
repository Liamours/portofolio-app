<template>
  <li>
    <strong>{{ project.title }}</strong>
    <span v-if="project.status"> ({{ project.status === 'in-progress' ? 'In Progress' : 'Planned' }})</span>
    <span v-if="project.period"> — {{ project.period }}</span>
    <br />
    <span v-if="project.institution">{{ project.institution }}<br /></span>
    <span>{{ project.summary }}</span>
    <ul v-if="project.stats?.length">
      <li v-for="s in project.stats" :key="s.label">{{ s.label }}: {{ s.value }}</li>
    </ul>
    <ul>
      <li v-for="(h, i) in project.highlights" :key="i">{{ h }}</li>
    </ul>
    <p>Stack: {{ project.stack.join(', ') }}</p>
    <p>
      <NuxtLink :to="`/projects/${project.id}`">Details</NuxtLink>
      <span v-if="project.links?.github"> — <a :href="project.links.github" target="_blank" rel="noopener noreferrer">GitHub</a></span>
      <span v-if="project.links?.demo"> — <a :href="project.links.demo" target="_blank" rel="noopener noreferrer">Demo</a></span>
      <span v-if="project.links?.paper"> — <a :href="project.links.paper" target="_blank" rel="noopener noreferrer">Paper</a></span>
    </p>
  </li>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio'
defineProps<{ project: Project }>()
</script>
