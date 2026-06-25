<template>
  <nav class="navbar">
    <a v-for="link in navLinks" :key="link.href" :href="link.href" class="nav-link">
      {{ link.label }}
    </a>
  </nav>
</template>

<script setup lang="ts">
const navLinks = [
  { href: '#about',      label: 'About' },
  { href: '#projects',   label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#publications', label: 'Publications' },
  { href: '#skills',     label: 'Skills' },
  { href: '#contact',    label: 'Contact' },
]
</script>

<style scoped>
.navbar {
  padding: 1rem 2rem;
  border-bottom: 1px solid #000;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0;
}

.nav-link {
  margin-right: 1.5rem;
}
</style>
