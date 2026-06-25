<template>
  <section id="experience" class="section">
    <div class="container">
      <h2>Experience</h2>
      <ul>
        <li v-for="(item, i) in portfolioItems" :key="i" class="exp-item">
          <strong>{{ item.role }}</strong> — {{ item.organization }} ({{ item.period }})
          <ul>
            <li v-for="(h, j) in item.highlights" :key="j">{{ h }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: experience } = await useExperience()

const portfolioItems = computed(() =>
  (experience.value ?? []).filter(e => e.portfolio)
)
</script>

<style scoped>
.exp-item + .exp-item {
  margin-top: 1.5rem;
}
</style>
