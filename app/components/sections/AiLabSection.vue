<template>
  <JourneySection
    v-if="journey"
    :journey="journey"
    section-id="ailab"
  />
</template>

<script setup lang="ts">
const { data: journey } = await useAiLabJourney()
</script>
