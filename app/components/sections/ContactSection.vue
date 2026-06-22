<template>
  <section id="contact" class="section">
    <div class="container">
      <h2>Contact</h2>
      <p>Available for internships and research collaborations. Medical imaging, ML engineering, full-stack deployment.</p>
      <ul v-if="hero">
        <li v-for="link in hero.links" :key="link.label">
          <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: hero } = await useHero()
</script>
