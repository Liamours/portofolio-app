<template>
  <JourneySection
    v-if="journey"
    :journey="journey"
    section-id="wbbs"
  />
</template>

<script setup lang="ts">
const { data: journey } = await useWbbsJourney()
</script>
