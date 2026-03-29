<script setup>
const props = defineProps({
  level: { type: String, required: true },
  topic: { type: String, required: true },
  duration: { type: String, required: true },
  starDifficulty: { type: Number, default: null },
  showStatus: { type: Boolean, default: false },
  isSolved: { type: Boolean, default: false },
  showDueReview: { type: Boolean, default: false }
})

const normalizeStarDifficulty = (value) => {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return 3
  return Math.max(1, Math.min(5, Math.round(numeric)))
}

const formatStars = (value) => {
  const star = normalizeStarDifficulty(value)
  return `${'★'.repeat(star)}${'☆'.repeat(5 - star)}`
}
</script>

<template>
  <div class="meta-row">
    <span v-if="showStatus" class="status-chip" :class="isSolved ? 'is-done' : 'is-not-started'">
      {{ isSolved ? '完了' : '未着手' }}
    </span>
    <span class="chip">{{ level }}</span>
    <span v-if="starDifficulty !== null" class="chip chip-star" :aria-label="`難易度 星${normalizeStarDifficulty(starDifficulty)}`">
      難易度 {{ formatStars(starDifficulty) }}
    </span>
    <span class="chip chip-topic">{{ topic }}</span>
    <span class="chip chip-time">{{ duration }}</span>
    <span v-if="showDueReview" class="chip chip-review">再挑戦</span>
  </div>
</template>

<style scoped>
.meta-row {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.status-chip {
  padding: 0.1875rem 0.5rem;
  border-radius: 62.4375rem;
  font-size: 0.75rem;
  font-weight: 700;
}

.status-chip.is-not-started {
  background: var(--status-not-started-bg);
  color: var(--status-not-started-text);
}

.status-chip.is-done {
  background: var(--status-done-bg);
  color: var(--status-done-text);
}

.chip {
  padding: 0.1875rem 0.5rem;
  border-radius: 62.4375rem;
  font-size: 0.75rem;
  font-weight: 700;
  background: #f4f5f8;
  color: #4e5a6a;
}

.chip-topic {
  background: #eef3ff;
  color: #2d5fa3;
}

.chip-time {
  background: #f0f0f2;
  color: #606369;
}

.chip-star {
  background: #fff8e1;
  color: #7a5300;
}

.chip-review {
  background: #fff4e6;
  color: #8a4c12;
}
</style>
