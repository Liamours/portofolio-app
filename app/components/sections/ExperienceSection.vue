<template>
  <section id="experience" class="section">
    <div class="container">
      <h2 class="section-title">Experience</h2>
      <div v-if="experience" class="groups">
        <div v-for="group in groups" :key="group.type" class="group">
          <div class="group-header">
            <Icon :name="group.icon" size="16" class="group-icon" />
            <span class="group-label">{{ group.label }}</span>
          </div>
          <div class="group-items">
            <div
              v-for="(item, i) in group.items"
              :key="i"
              class="exp-item"
              :class="{ open: openItems.has(group.type + i) }"
              @click="toggle(group.type + i)"
            >
              <div class="exp-summary">
                <div class="exp-main">
                  <span class="exp-role">{{ item.role }}</span>
                  <span class="exp-org">{{ item.organization }}</span>
                </div>
                <div class="exp-right">
                  <span class="exp-period">{{ item.period }}</span>
                  <Icon name="ph:caret-down" size="14" class="caret" :class="{ rotated: openItems.has(group.type + i) }" />
                </div>
              </div>
              <ul v-show="openItems.has(group.type + i)" class="exp-highlights">
                <li v-for="(h, j) in item.highlights" :key="j">{{ h }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Experience } from '~/types/portfolio'

const { data: experience } = await useExperience()

const openItems = ref<Set<string>>(new Set())
const toggle = (key: string) => {
  if (openItems.value.has(key)) openItems.value.delete(key)
  else openItems.value.add(key)
  openItems.value = new Set(openItems.value)
}

const groupConfig = [
  { type: 'research',     label: 'Research',                 icon: 'ph:flask' },
  { type: 'teaching',     label: 'Teaching & Mentoring',     icon: 'ph:chalkboard-teacher' },
  { type: 'organization', label: 'Leadership & Organization', icon: 'ph:users-three' },
  { type: 'competition',  label: 'Competitions',             icon: 'ph:trophy' },
  { type: 'committee',    label: 'Committee',                icon: 'ph:clipboard-text' },
]

const groups = computed(() =>
  groupConfig
    .map(g => ({ ...g, items: experience.value?.filter(e => e.type === g.type) ?? [] }))
    .filter(g => g.items.length > 0)
)
</script>

<style scoped>
.groups {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
}

.group-icon { color: var(--text-muted); }

.group-label {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.group-count {
  font-size: 0.7rem;
  color: var(--border);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 99px;
  padding: 0.05rem 0.45rem;
}

.group-items {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-left: 1.5rem;
  border-left: 1px solid var(--border);
}

.exp-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s;
}

.exp-item:hover,
.exp-item.open {
  border-color: var(--accent-2);
}

.exp-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
}

.exp-main {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.exp-role {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.3;
}

.exp-org {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.exp-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.exp-period {
  font-size: 0.75rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.caret {
  color: var(--text-muted);
  transition: transform 0.25s ease;
}
.caret.rotated { transform: rotate(180deg); }

.exp-highlights {
  list-style: none;
  padding: 0.65rem 1rem 0.75rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.exp-highlights li {
  font-size: 0.79rem;
  color: var(--text-muted);
  padding-left: 1rem;
  position: relative;
  line-height: 1.5;
}

.exp-highlights li::before {
  content: '›';
  position: absolute;
  left: 0;
  color: var(--border);
}
</style>
