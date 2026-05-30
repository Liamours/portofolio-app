<template>
  <JourneySection
    v-if="journey"
    :journey="journey"
    section-id="birdsound"
  />
</template>

<script setup lang="ts">
const { data: journey } = await useBirdsoundJourney()
</script>
