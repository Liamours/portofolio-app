<template>
  <li class="project-card">
    <NuxtLink :to="`/projects/${project.id}`"><strong>{{ project.title }}</strong></NuxtLink>
    <span v-if="project.status"> ({{ project.status === 'in-progress' ? 'In Progress' : 'Planned' }})</span>
    <span v-if="project.period"> · {{ project.period }}</span>
    <p>{{ project.summary }}</p>
  </li>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio'
defineProps<{ project: Project }>()
</script>
