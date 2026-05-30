<template>
  <section id="about" class="section">
    <div class="container">
      <h2 class="section-title">About</h2>
      <div v-if="about" class="about-wrap">
        <p class="about-bio">{{ about.bio }}</p>
        <div class="stat-row">
          <div class="stat-chip">
            <Icon name="ph:graduation-cap" size="15" class="chip-icon" />
            <span class="chip-label">GPA</span>
            <span class="chip-value">{{ about.gpa }}</span>
          </div>
          <div class="stat-chip">
            <Icon name="ph:buildings" size="15" class="chip-icon" />
            <span class="chip-value">{{ about.institution }}</span>
          </div>
          <div class="stat-chip">
            <Icon name="ph:calendar-blank" size="15" class="chip-icon" />
            <span class="chip-value">{{ about.graduation }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: about } = await useAbout()
</script>

<style scoped>
.about-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  max-width: 720px;
}

.about-bio {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.8;
}

.stat-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.stat-chip {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.85rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 99px;
  font-size: 0.8rem;
}

.chip-icon { color: var(--text-muted); flex-shrink: 0; }
.chip-label { color: var(--text-muted); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; }
.chip-value { color: var(--text); font-weight: 500; }
</style>
