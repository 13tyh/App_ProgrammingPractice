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
  border: 1px solid #e3e3e8;
  background: var(--surface);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(14px);
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
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 650;
  letter-spacing: -0.017em;
}

.eyebrow {
  margin: 0;
  font-size: 11px;
  color: var(--text-sub);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.done-button {
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 9px var(--space-3);
  background: var(--accent);
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(0, 113, 227, 0.24);
}

@media (max-width: 760px) {
  .topbar {
    grid-template-columns: 1fr;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
  }

  .back-link {
    font-size: 13px;
  }

  .title-wrap h1 {
    font-size: clamp(20px, 5.4vw, 26px);
  }

  .done-button {
    width: 100%;
    min-height: 42px;
    font-size: 14px;
  }
}

@media (max-width: 430px) {
  .topbar {
    padding: 8px;
  }

  .title-wrap h1 {
    line-height: 1.22;
    font-size: 20px;
  }

  .eyebrow {
    font-size: 10px;
  }
}
</style>
