<template>
  <section id="publications" class="section">
    <div class="container">
      <h2 class="section-title">Publications</h2>
      <div v-if="publications" class="pub-grid">
        <div
          v-for="(pub, i) in publications"
          :key="i"
          class="pub-card"
          :class="`type-${pub.type.toLowerCase().replace(' ', '-')}`"
        >
          <div class="pub-accent-bar" />

          <div v-if="pub.image" class="pub-image-wrap">
            <img :src="pub.image" :alt="pub.title" class="pub-image" />
          </div>

          <div class="pub-body">
            <div class="pub-meta">
              <span class="pub-type-badge">{{ pub.type }}</span>
              <span class="pub-year">{{ pub.year }}</span>
            </div>
            <h3 class="pub-title">{{ pub.title }}</h3>
            <p class="pub-venue">{{ pub.venue }}</p>
            <p v-if="pub.authors" class="pub-authors">{{ pub.authors }}</p>
            <a
              v-if="pub.link"
              :href="pub.link"
              target="_blank"
              rel="noopener noreferrer"
              class="pub-link"
            >
              <Icon name="ph:arrow-square-out" size="13" /> View
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: publications } = await usePublications()
</script>

<style scoped>
.pub-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.pub-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s, transform 0.2s;
}

.pub-card:hover {
  border-color: var(--text-muted);
  transform: translateY(-2px);
}

/* Colored top accent bar per type */
.pub-accent-bar {
  height: 3px;
  width: 100%;
}

.type-conference-paper .pub-accent-bar { background: var(--accent-1); }
.type-preprint        .pub-accent-bar { background: var(--accent-1); }
.type-journal-paper   .pub-accent-bar { background: var(--accent-1); }
.type-dataset         .pub-accent-bar { background: var(--accent-2); }
.type-e-book          .pub-accent-bar { background: var(--accent-1); }
.type-review          .pub-accent-bar { background: var(--text-muted); }

/* Type badge colors */
.type-conference-paper .pub-type-badge { color: var(--accent-1); border-color: var(--accent-1-sub); background: var(--accent-1-sub); }
.type-preprint         .pub-type-badge { color: var(--accent-1);         border-color: var(--accent-1-sub); background: var(--accent-1-sub); }
.type-journal-paper    .pub-type-badge { color: var(--accent-1);         border-color: var(--accent-1-sub); background: var(--accent-1-sub); }
.type-dataset          .pub-type-badge { color: var(--accent-2); border-color: var(--accent-2-sub); background: var(--accent-2-sub); }
.type-e-book           .pub-type-badge { color: var(--accent-1);         border-color: var(--accent-1-sub); background: var(--accent-1-sub); }
.type-review           .pub-type-badge { color: var(--text-muted); border-color: var(--border); background: var(--surface-2); }

.pub-image-wrap {
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.pub-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 0.3s ease;
}

.pub-card:hover .pub-image {
  transform: scale(1.03);
}

.pub-body {
  padding: 1.1rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.pub-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.pub-type-badge {
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.18rem 0.55rem;
  border-radius: 3px;
  border: 1px solid transparent;
}

.pub-year {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.pub-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.4;
  margin-top: 0.1rem;
}

.pub-venue {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.pub-authors {
  font-size: 0.74rem;
  color: var(--text-muted);
  font-style: italic;
  opacity: 0.75;
}

.pub-link {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: auto;
  padding-top: 0.5rem;
  width: fit-content;
  transition: color 0.2s;
}

.pub-link:hover { color: var(--text); }

@media (max-width: 640px) {
  .pub-grid { grid-template-columns: 1fr; }
}
</style>
