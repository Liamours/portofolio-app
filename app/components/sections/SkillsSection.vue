<template>
  <section id="skills" class="section">
    <div class="container">
      <h2>Skills</h2>
      <ul>
        <li v-for="group in skills" :key="group.category">
          <strong>{{ group.category }}</strong>: {{ group.items.join(', ') }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: skills } = await useSkills()
</script>
