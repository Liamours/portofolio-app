<template>
  <section id="hero" class="section hero-section">
    <div class="container">
      <div v-if="hero">
        <h1>{{ hero.name }}</h1>
        <p>{{ hero.title }}</p>
        <p v-if="hero.tagline">{{ hero.tagline }}</p>
        <ul>
          <li v-for="link in hero.links" :key="link.label">
            <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
          </li>
        </ul>
        <a href="#projects">See my work</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: hero } = await useHero()
</script>

<style scoped>
.hero-section { border-top: none; }
.hero-section a[href="#projects"] { display: block; margin-top: 1rem; }
</style>
