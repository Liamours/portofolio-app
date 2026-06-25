<template>
  <section id="publications" class="section">
    <div class="container">
      <h2>Publications</h2>
      <ul>
        <li v-for="(pub, i) in publications" :key="i">
          <strong>{{ pub.type }}</strong> ({{ pub.year }}): {{ pub.title }}, {{ pub.venue }}.
          <span v-if="pub.context"> {{ pub.context }}</span>
          <span v-if="pub.link"> <a :href="pub.link" target="_blank" rel="noopener noreferrer">Link</a></span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: publications } = await usePublications()
</script>

<style scoped>
ul > li + li {
  margin-top: 1rem;
}
</style>
