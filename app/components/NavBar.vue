<template>
  <nav class="navbar">
    <div class="nav-links">
      <a v-for="link in navLinks" :key="link.href" :href="link.href" class="nav-link">
        {{ link.label }}
      </a>
    </div>
    <ThemeToggle />
  </nav>
</template>

<script setup lang="ts">
const navLinks = [
  { href: '#about',      label: 'About' },
  { href: '#journeys',   label: 'Journeys' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#skills',     label: 'Skills' },
]
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.9rem 2rem;
  background: rgba(14, 12, 10, 0.90);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

html.light .navbar {
  background: rgba(245, 240, 235, 0.92);
}

.nav-links {
  display: flex;
  gap: 0;
}

.nav-link {
  padding: 0.3rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.01em;
  transition: color 0.18s ease-out;
  border-radius: 0;
}

.nav-link:hover { color: var(--text); }

@media (max-width: 640px) {
  .nav-links { display: none; }
}
</style>
