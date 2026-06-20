<template>
  <section id="experience" class="section">
    <div class="container">
      <h2>Experience</h2>
      <div v-for="group in groups" :key="group.type" class="group">
        <h3>{{ group.label }}</h3>
        <ul>
          <li v-for="(item, i) in group.items" :key="i">
            <strong>{{ item.role }}</strong> — {{ item.organization }} ({{ item.period }})
            <ul>
              <li v-for="(h, j) in item.highlights" :key="j">{{ h }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: experience } = await useExperience()

const groupConfig = [
  { type: 'research',     label: 'Research' },
  { type: 'teaching',     label: 'Teaching & Mentoring' },
  { type: 'organization', label: 'Leadership & Organization' },
  { type: 'competition',  label: 'Competitions' },
  { type: 'committee',    label: 'Committee' },
]

const groups = computed(() =>
  groupConfig
    .map(g => ({ ...g, items: experience.value?.filter(e => e.type === g.type) ?? [] }))
    .filter(g => g.items.length > 0)
)
</script>

<style scoped>
.group + .group {
  margin-top: 2.5rem;
}

.group > ul > li + li {
  margin-top: 1rem;
}
</style>
