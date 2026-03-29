<script setup>
defineProps({
  expanded: { type: Boolean, required: true },
  collapsedLabel: { type: String, required: true },
  expandedLabel: { type: String, required: true }
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <button type="button" class="toggle-button" :aria-pressed="expanded" @click="emit('toggle')">
    <span class="toggle-track" aria-hidden="true"><span class="toggle-thumb" /></span>
    <span>{{ expanded ? expandedLabel : collapsedLabel }}</span>
  </button>
</template>

<style scoped>
.toggle-button {
  margin-top: var(--space-2);
  border: 0.0625rem solid var(--line);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  background: #f4f7fb;
  color: #2d4f79;
  cursor: pointer;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.toggle-track {
  width: 1.875rem;
  height: 1.125rem;
  border-radius: 62.4375rem;
  background: rgba(148, 163, 184, 0.25);
  border: 0.0625rem solid rgba(191, 219, 254, 0.35);
  position: relative;
}

.toggle-thumb {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 62.4375rem;
  background: #dbeafe;
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  transition: transform 0.18s ease;
}

.toggle-button[aria-pressed='true'] .toggle-track {
  background: rgba(16, 185, 129, 0.38);
}

.toggle-button[aria-pressed='true'] .toggle-thumb {
  transform: translateX(0.75rem);
}
</style>
