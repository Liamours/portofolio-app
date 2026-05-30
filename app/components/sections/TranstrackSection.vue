<template>
  <JourneySection
    v-if="journey"
    :journey="journey"
    section-id="transtrack"
  />
</template>

<script setup lang="ts">
const { data: journey } = await useTranstrackJourney()
</script>
