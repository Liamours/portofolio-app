<template>
  <section id="hero" class="section">
    <div class="container">
      <div v-if="hero">
        <h1>{{ hero.name }}</h1>
        <p>{{ hero.title }}</p>
        <p>{{ hero.tagline }}</p>
        <ul>
          <li v-for="link in hero.links" :key="link.label">
            <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: hero } = await useHero()
</script>
