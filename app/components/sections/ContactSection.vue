<template>
  <section id="contact" class="section">
    <div class="container">
      <h2 class="section-title">Contact</h2>
      <div v-if="hero" class="contact-content">
        <p class="contact-text">Open to research collaborations, industrial projects, and interesting opportunities.</p>
        <div class="contact-links">
          <a
            v-for="link in hero.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link"
          >
            <Icon :name="linkIcon(link.label)" size="22" class="link-icon" />
            <span class="link-label">{{ link.label }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: hero } = await useHero()

const iconMap: Record<string, string> = {
  GitHub:       'ph:github-logo-fill',
  LinkedIn:     'ph:linkedin-logo-fill',
  Email:        'ph:envelope-simple-fill',
  Certificates: 'ph:certificate-fill',
}
const linkIcon = (label: string) => iconMap[label] ?? 'ph:arrow-square-out'
</script>

<style scoped>
.contact-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 560px;
}

.contact-text {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.contact-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 1.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  min-width: 90px;
  transition: border-color 0.2s, background 0.2s;
}

.contact-link:hover {
  border-color: var(--text-muted);
  background: var(--surface-2);
}

.link-icon {
  color: var(--text);
}

.link-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
</style>
