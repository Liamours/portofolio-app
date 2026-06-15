<template>
  <section id="about" class="section">
    <div class="container">
      <h2>About</h2>
      <div v-if="about">
        <p>{{ about.bio }}</p>
        <ul>
          <li>GPA: {{ about.gpa }}</li>
          <li>Institution: {{ about.institution }}</li>
          <li>Graduation: {{ about.graduation }}</li>
          <li>Hardware: {{ about.hardware }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: about } = await useAbout()
</script>
