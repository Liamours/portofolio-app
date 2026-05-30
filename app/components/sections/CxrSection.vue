<template>
  <JourneySection
    v-if="journey"
    :journey="journey"
    section-id="cxr"
  />
</template>

<script setup lang="ts">
const { data: journey } = await useCxrJourney()
</script>
