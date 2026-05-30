<template>
  <button
    class="toggle"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <Icon :name="isDark ? 'ph:sun' : 'ph:moon'" size="16" />
  </button>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme()
</script>

<style scoped>
.toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.35rem;
  cursor: pointer;
  color: var(--text-muted);
  transition: color 0.2s, border-color 0.2s;
}

.toggle:hover {
  color: var(--text);
  border-color: var(--text-muted);
}
</style>
