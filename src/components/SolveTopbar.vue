<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  backRouteName: { type: String, required: true },
  lessonLabel: { type: String, required: true },
  title: { type: String, required: true },
  buttonLabel: { type: String, default: '完了して次へ' }
})

const emit = defineEmits(['complete'])
</script>

<template>
  <header class="topbar card">
    <RouterLink class="back-link" :to="{ name: backRouteName }">← 一覧へ戻る</RouterLink>
    <div class="title-wrap">
      <p class="eyebrow">{{ lessonLabel }}</p>
      <h1>{{ title }}</h1>
    </div>
    <button type="button" class="done-button" @click="emit('complete')">{{ buttonLabel }}</button>
  </header>
</template>

<style scoped>
.card {
  border-radius: var(--radius-lg);
  border: 0.0625rem solid #e3e3e8;
  background: var(--surface);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(0.875rem);
}

.topbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
}

.back-link {
  text-decoration: none;
  color: var(--accent);
  font-weight: 600;
}

.title-wrap h1 {
  margin: var(--space-1) 0 0;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 650;
  letter-spacing: -0.017em;
}

.eyebrow {
  margin: 0;
  font-size: 0.6875rem;
  color: var(--text-sub);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.done-button {
  border: 0.0625rem solid transparent;
  border-radius: 0.625rem;
  padding: 0.5625rem var(--space-3);
  background: var(--accent);
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0.375rem 0.875rem rgba(0, 113, 227, 0.24);
}

@media (max-width: 47.5rem) {
  .topbar {
    grid-template-columns: 1fr;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
  }

  .back-link {
    font-size: 0.8125rem;
  }

  .title-wrap h1 {
    font-size: clamp(1.25rem, 5.4vw, 1.625rem);
  }

  .done-button {
    width: 100%;
    min-height: 2.625rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 26.875rem) {
  .topbar {
    padding: 0.5rem;
  }

  .title-wrap h1 {
    line-height: 1.22;
    font-size: 1.25rem;
  }

  .eyebrow {
    font-size: 0.625rem;
  }
}
</style>
