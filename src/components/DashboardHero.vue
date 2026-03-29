<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, default: '学習ダッシュボード' }
})
</script>

<template>
  <header class="hero">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
  </header>
</template>

<style scoped>
.hero {
  background: var(--surface);
  border: 1px solid #e3e3e8;
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-card);
}

.eyebrow {
  display: inline-block;
  margin: 0;
  padding: 4px 10px;
  border-radius: 999px;
  background: #eef4ff;
  border: 1px solid #d4e5fb;
  color: #1e63ac;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
}

h1 {
  margin: var(--space-2) 0 0;
  font-size: clamp(32px, 4vw, 40px);
  font-weight: 650;
  color: var(--heading);
  letter-spacing: -0.02em;
}
</style>
