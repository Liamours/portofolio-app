<template>
  <section id="hero" class="section hero-section">
    <div class="container">
      <div v-if="hero">
        <img src="/images/me.png" alt="M. Rifqi Dzaky Azhad" class="hero-photo" />
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
.hero-photo { display: block; width: 120px; height: 120px; object-fit: cover; object-position: top center; margin: 0 auto 1.5rem; }
</style>
