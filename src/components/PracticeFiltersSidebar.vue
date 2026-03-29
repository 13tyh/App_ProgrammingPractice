<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  totalProgressPercent: { type: Number, required: true },
  totalSolvedCount: { type: Number, required: true },
  totalTaskCount: { type: Number, required: true },
  difficultyOptions: { type: Array, required: true },
  selectedDifficulty: { type: String, required: true },
  keyword: { type: String, required: true },
  showOnlyUnsolved: { type: Boolean, required: true },
  showOnlyDueReview: { type: Boolean, default: false },
  hasActiveFilters: { type: Boolean, required: true },
  currentStreak: { type: Number, default: 0 },
  dueReviewCount: { type: Number, default: 0 },
  todaySolvedCount: { type: Number, default: 0 },
  dailyGoal: { type: Number, default: 3 },
  recentDailySolved: { type: Array, default: () => [] },
  solvedByLevel: { type: Array, default: () => [] }
})

const emit = defineEmits([
  'update:selectedDifficulty',
  'update:keyword',
  'update:showOnlyUnsolved',
  'update:showOnlyDueReview',
  'clear-filters'
])

const searchInput = ref(null)

const goalPercent = computed(() => {
  if (props.dailyGoal <= 0) return 0
  return Math.min(100, Math.round((props.todaySolvedCount / props.dailyGoal) * 100))
})

const goalReached = computed(() => props.todaySolvedCount >= props.dailyGoal)

const onGlobalKeydown = (event) => {
  const target = event.target
  const isTypingTarget = target instanceof HTMLElement && /INPUT|TEXTAREA/.test(target.tagName)
  if (event.key === '/' && !isTypingTarget) {
    event.preventDefault()
    searchInput.value?.focus()
    return
  }
  if (event.key === 'Escape' && document.activeElement === searchInput.value) {
    emit('update:keyword', '')
    searchInput.value.blur()
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKeydown))
</script>

<template>
  <aside class="sidebar card">
    <div class="summary">
      <p class="summary-label">全体進捗</p>
      <p class="summary-value">{{ totalProgressPercent }}%</p>
      <p class="summary-sub">{{ totalSolvedCount }} / {{ totalTaskCount }} 問 完了</p>
      <div class="meter"><div class="meter-bar" :style="{ width: `${totalProgressPercent}%` }" /></div>
    </div>

    <section class="insight-card" v-if="recentDailySolved.length || solvedByLevel.length">
      <p class="insight-title">学習ログ</p>
      <div class="goal-ring-wrap" :class="{ reached: goalReached }">
        <div class="goal-ring" :style="{ '--goal-percent': `${goalPercent}%` }">
          <span>{{ goalPercent }}%</span>
        </div>
        <div>
          <p class="goal-title">今日の目標 {{ dailyGoal }} 問</p>
          <p class="goal-sub">達成 {{ todaySolvedCount }} / {{ dailyGoal }}</p>
        </div>
      </div>
      <p class="streak">連続 {{ currentStreak }} 日</p>
      <p class="review-note" v-if="dueReviewCount > 0">再挑戦期限: {{ dueReviewCount }} 件</p>

      <div class="daily-strip" v-if="recentDailySolved.length">
        <div v-for="day in recentDailySolved" :key="day.key" class="daily-item">
          <span class="daily-count">{{ day.count }}</span>
          <span class="daily-label">{{ day.label }}</span>
        </div>
      </div>

      <ul class="level-progress" v-if="solvedByLevel.length">
        <li v-for="item in solvedByLevel" :key="item.level">
          <span>{{ item.level }}</span>
          <strong>{{ item.solved }}/{{ item.total }} ({{ item.percent }}%)</strong>
        </li>
      </ul>
    </section>

    <label class="input-wrap">
      <span>検索</span>
      <input
        ref="searchInput"
        :value="keyword"
        type="text"
        placeholder="キーワードで絞り込み（/ でフォーカス）"
        @input="emit('update:keyword', $event.target.value)"
      />
    </label>

    <label class="check-wrap">
      <input
        :checked="showOnlyUnsolved"
        type="checkbox"
        @change="emit('update:showOnlyUnsolved', $event.target.checked)"
      />
      <span>未完了のみ表示</span>
    </label>

    <label class="check-wrap">
      <input
        :checked="showOnlyDueReview"
        type="checkbox"
        @change="emit('update:showOnlyDueReview', $event.target.checked)"
      />
      <span>再挑戦期限のみ表示</span>
    </label>

    <div class="level-wrap">
      <p>難易度</p>
      <div class="level-list">
        <button
          v-for="level in difficultyOptions"
          :key="level"
          type="button"
          class="level-button"
          :class="{ active: selectedDifficulty === level }"
          @click="emit('update:selectedDifficulty', level)"
        >
          {{ level }}
        </button>
      </div>
    </div>

    <button v-if="hasActiveFilters" type="button" class="clear-button" @click="emit('clear-filters')">
      フィルタをクリア
    </button>
  </aside>
</template>

<style scoped>
.card {
  border-radius: var(--radius-lg);
  border: 0.0625rem solid #e3e3e8;
  background: var(--surface);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(0.875rem);
}

.sidebar {
  padding: var(--space-3);
  position: sticky;
  top: 4.875rem;
  height: fit-content;
}

.summary-label {
  margin: 0;
  color: var(--text-sub);
  font-size: 0.75rem;
}

.summary-value {
  margin: var(--space-1) 0;
  font-size: 1.75rem;
  font-weight: 800;
}

.summary-sub {
  margin: 0;
  color: var(--text-sub);
}

.meter {
  margin-top: var(--space-2);
  height: 0.4375rem;
  border-radius: 62.4375rem;
  background: #e6e9f0;
  overflow: hidden;
}

.meter-bar {
  height: 100%;
  background: linear-gradient(90deg, #a7d1ff, #0071e3);
}

.input-wrap,
.check-wrap,
.level-wrap {
  margin-top: var(--space-3);
  display: block;
}

.insight-card {
  margin-top: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  border: 0.0625rem solid #dbe5f3;
  background: #f6f9ff;
}

.insight-title {
  margin: 0;
  color: #28598f;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.streak {
  margin: var(--space-2) 0 0;
  color: var(--text-main);
  font-size: 1.375rem;
  font-weight: 800;
}

.goal-ring-wrap {
  margin-top: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.goal-ring {
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 62.4375rem;
  display: grid;
  place-items: center;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--text-main);
  background: conic-gradient(#0071e3 var(--goal-percent), #dfe7f5 0);
  position: relative;
}

.goal-ring::after {
  content: '';
  position: absolute;
  inset: 0.375rem;
  border-radius: 62.4375rem;
  background: #ffffff;
}

.goal-ring span {
  position: relative;
  z-index: 1;
}

.goal-title {
  margin: 0;
  color: var(--text-main);
  font-size: 0.8125rem;
  font-weight: 700;
}

.goal-sub {
  margin: 0.125rem 0 0;
  color: var(--text-sub);
  font-size: 0.75rem;
}

.goal-ring-wrap.reached .goal-ring {
  background: conic-gradient(#22a04b var(--goal-percent), #d9efdf 0);
  animation: celebrate 1s ease;
}

@keyframes celebrate {
  0% { transform: scale(0.96); }
  40% { transform: scale(1.06); }
  100% { transform: scale(1); }
}

.review-note {
  margin: var(--space-1) 0 0;
  color: #91451d;
  font-size: 0.75rem;
  font-weight: 700;
}

.daily-strip {
  margin-top: var(--space-2);
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.25rem;
}

.daily-item {
  display: grid;
  justify-items: center;
  gap: 0.125rem;
  border: 0.0625rem solid #d4e0f5;
  border-radius: 0.625rem;
  padding: 0.375rem 0.125rem;
  background: #ffffff;
}

.daily-count {
  color: var(--text-main);
  font-size: 0.8125rem;
  font-weight: 700;
}

.daily-label {
  color: var(--text-sub);
  font-size: 0.625rem;
}

.level-progress {
  margin: var(--space-2) 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.375rem;
}

.level-progress li {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-sub);
}

.level-progress strong {
  color: var(--text-main);
}

.input-wrap span,
.level-wrap p {
  margin: 0 0 var(--space-2);
  display: block;
  color: var(--text-main);
  font-size: 0.8125rem;
  font-weight: 700;
}

.input-wrap input {
  width: 100%;
  box-sizing: border-box;
  border: 0.0625rem solid var(--line);
  border-radius: var(--radius-md);
  padding: 0.5625rem 0.625rem;
  background: #ffffff;
  color: var(--text-main);
}

.input-wrap input:focus-visible {
  outline: 0;
  border-color: #9ec8f7;
  box-shadow: 0 0 0 0.25rem rgba(0, 113, 227, 0.12);
}

.check-wrap {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-main);
  font-weight: 700;
}

.level-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.level-button {
  border: 0.0625rem solid var(--line);
  border-radius: 62.4375rem;
  padding: 0.375rem 0.625rem;
  background: #ffffff;
  color: var(--text-main);
  cursor: pointer;
  font-weight: 600;
}

.level-button:hover {
  border-color: #b8c8df;
  transform: translateY(-0.0625rem);
}

.level-button.active {
  background: var(--accent-soft);
  color: var(--accent);
  border-color: transparent;
}

.clear-button {
  margin-top: var(--space-3);
  width: 100%;
  border: 0.0625rem solid var(--line);
  border-radius: var(--radius-md);
  padding: 0.4375rem 0.5625rem;
  background: transparent;
  color: var(--text-main);
  font-weight: 600;
  cursor: pointer;
}

.clear-button:hover {
  background: #ffffff;
}

@media (max-width: 62.5rem) {
  .sidebar {
    position: static;
  }
}

@media (max-width: 26.875rem) {
  .sidebar {
    padding: var(--space-2);
  }

  .summary-value {
    font-size: 1.5rem;
  }

  .goal-ring {
    width: 3.125rem;
    height: 3.125rem;
  }

  .goal-ring::after {
    inset: 0.3125rem;
  }

  .daily-strip {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .daily-item {
    padding: 0.3125rem 0.125rem;
  }

  .level-button,
  .clear-button {
    min-height: 2.375rem;
  }
}

@media (max-width: 18.75rem) {
  .sidebar {
    padding: 0.5rem;
  }

  .summary-value {
    font-size: 1.25rem;
  }

  .goal-ring-wrap {
    align-items: flex-start;
    flex-direction: column;
  }

  .goal-ring {
    width: 2.75rem;
    height: 2.75rem;
    font-size: 0.6875rem;
  }

  .goal-ring::after {
    inset: 0.25rem;
  }

  .daily-strip {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .input-wrap input,
  .level-button,
  .clear-button {
    font-size: 0.75rem;
  }
}

</style>
