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
  border: 0.0625rem solid #e3e3e8;
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  backdrop-filter: blur(0.75rem);
  box-shadow: var(--shadow-card);
}

.eyebrow {
  display: inline-block;
  margin: 0;
  padding: 0.25rem 0.625rem;
  border-radius: 62.4375rem;
  background: #eef4ff;
  border: 0.0625rem solid #d4e5fb;
  color: #1e63ac;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

h1 {
  margin: var(--space-2) 0 0;
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 650;
  color: var(--heading);
  letter-spacing: -0.02em;
}
</style>
