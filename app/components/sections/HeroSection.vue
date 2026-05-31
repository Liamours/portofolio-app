<template>
  <section id="hero" class="hero-wrapper">
    <div class="hero-bg" aria-hidden="true" />
    <div v-if="hero" class="hero">
      <div class="hero-content">
        <p class="hero-pre">Hi, I'm</p>
        <h1 class="hero-name">{{ hero.name }}</h1>
        <p class="hero-title">{{ hero.title }}</p>
        <p class="hero-tagline">{{ hero.tagline }}</p>
        <div class="hero-links">
          <a
            v-for="link in hero.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hero-link"
          >
            <Icon :name="linkIcon(link.label)" size="16" />
            {{ link.label }}
          </a>
        </div>
      </div>
      <div class="hero-photo-wrap">
        <img src="/images/me.png" alt="M. Rifqi Dzaky Azhad" class="hero-photo" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: hero } = await useHero()

const iconMap: Record<string, string> = {
  GitHub:       'ph:github-logo',
  LinkedIn:     'ph:linkedin-logo',
  Email:        'ph:envelope-simple',
  Certificates: 'ph:certificate',
}
const linkIcon = (label: string) => iconMap[label] ?? 'ph:arrow-square-out'
</script>

<style scoped>
.hero-wrapper {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: url('/images/background-hero.jpg') center / cover no-repeat;
  opacity: 0.12;
  z-index: 0;
}

html.light .hero-bg {
  opacity: 0.18;
  filter: brightness(0.85) contrast(1.1);
}

.hero {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  padding: 8rem 2rem 4rem;
  max-width: 1100px;
  margin: 0 auto;
  min-height: 100vh;
}

.hero-content { flex: 1; max-width: 600px; }

.hero-pre {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.hero-name {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 400;
  line-height: 1.0;
  letter-spacing: -0.01em;
  color: var(--text);
  margin-bottom: 0.75rem;
}

.hero-title {
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  color: var(--text-muted);
  font-weight: 400;
  margin-bottom: 1.25rem;
}

.hero-tagline {
  font-size: 0.975rem;
  color: var(--text-muted);
  line-height: 1.75;
  max-width: 520px;
  margin-bottom: 2.5rem;
}

.hero-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.hero-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1.1rem;
  border: 1px solid var(--accent-1);
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--text);
  background: var(--accent-1-sub);
  transition: border-color 0.2s ease-out, color 0.2s ease-out, background 0.2s ease-out, transform 0.15s ease-out;
}

.hero-link:hover {
  border-color: var(--accent-1);
  color: var(--text);
  background: var(--accent-1-sub);
  transform: translateY(-2px);
}

.hero-photo-wrap {
  flex-shrink: 0;
}

.hero-photo {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
  border: 2px solid var(--border);
  display: block;
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 2rem;
    min-height: auto;
    padding: 6rem 2rem 4rem;
  }

  .hero-photo {
    width: 120px;
    height: 120px;
  }
}
</style>
