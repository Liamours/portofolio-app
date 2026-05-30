<template>
  <nav class="navbar">
    <div class="nav-links">
      <a v-for="link in navLinks" :key="link.href" :href="link.href" class="nav-link">
        <Icon :name="link.icon" size="15" />
        <span>{{ link.label }}</span>
      </a>
    </div>
    <ThemeToggle />
  </nav>
</template>

<script setup lang="ts">
const navLinks = [
  { href: '#about',        label: 'About',        icon: 'ph:user' },
  { href: '#journeys',     label: 'Journeys',     icon: 'ph:map-trifold' },
  { href: '#experience',   label: 'Experience',   icon: 'ph:briefcase' },
  { href: '#projects',     label: 'Projects',     icon: 'ph:folder-open' },
  { href: '#skills',       label: 'Skills',       icon: 'ph:wrench' },
]
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 2rem;
  background: rgba(12, 12, 12, 0.88);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

html.light .navbar {
  background: rgba(250, 250, 248, 0.88);
}

.nav-name {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text);
  letter-spacing: 0.05em;
}

.nav-links {
  display: flex;
  gap: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  font-size: 0.82rem;
  color: var(--text-muted);
  transition: color 0.2s, background 0.2s;
}

.nav-link:hover {
  color: var(--text);
  background: var(--surface-2);
}

@media (max-width: 768px) {
  .nav-link span { display: none; }
  .nav-links { gap: 0; }
}

@media (max-width: 480px) {
  .nav-links { display: none; }
}
</style>
