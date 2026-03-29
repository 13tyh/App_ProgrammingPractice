<script setup>
defineProps({
  state: { type: String, default: 'idle' },
  message: { type: String, required: true }
})
</script>

<template>
  <p class="check-result" :class="state">
    <span class="check-icon" aria-hidden="true">{{ state === 'ok' ? '✓' : state === 'ng' ? '!' : '•' }}</span>
    <span>{{ message }}</span>
  </p>
</template>

<style scoped>
.check-result {
  margin: var(--space-3) 0 0;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 6px var(--space-3);
  border-radius: 9px;
  border: 1px solid #d8dbe2;
  background: #f7f8fa;
}

.check-icon {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  background: rgba(186, 193, 206, 0.32);
  color: #2d3541;
}

.check-result.ok {
  border-color: #b8dfc5;
  background: #ecf9f0;
  color: #21693a;
}

.check-result.ng {
  border-color: #edc0ca;
  background: #fff1f4;
  color: #9b3347;
}

.check-result.idle {
  color: #4e5561;
}
</style>
