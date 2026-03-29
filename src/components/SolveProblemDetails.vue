<script setup>
import TaskMetaRow from './TaskMetaRow.vue'

const props = defineProps({
  task: { type: Object, required: true },
  includeStarterSamples: { type: Boolean, default: false },
  includeSpecAssumptions: { type: Boolean, default: false }
})
</script>

<template>
  <details class="inline-problem" open>
    <summary>問題詳細</summary>
    <p class="inline-problem-title">{{ task.title }}</p>
    <p class="inline-problem-body">{{ task.problem }}</p>
    <TaskMetaRow :level="task.level" :topic="task.topic" :duration="task.duration" :star-difficulty="task.starDifficulty" />
    <p class="inline-signature">シグネチャ: {{ task.thinking?.functionSignature }}</p>
    <ul v-if="task.thinking?.argumentHints?.length" class="inline-list">
      <li v-for="item in task.thinking.argumentHints" :key="`arg-${item}`">{{ item }}</li>
    </ul>
    <ul v-if="includeStarterSamples && task.thinking?.starterSamples?.length" class="inline-list">
      <li v-for="item in task.thinking.starterSamples" :key="`sample-${item}`">例: {{ item }}</li>
    </ul>
    <ul v-if="task.thinking?.conditions?.length" class="inline-list">
      <li v-for="item in task.thinking.conditions" :key="`cond-${item}`">条件: {{ item }}</li>
    </ul>
    <ul v-if="includeSpecAssumptions && task.spec?.assumptions?.length" class="inline-list">
      <li v-for="item in task.spec.assumptions.slice(0, 2)" :key="`inline-a-${item}`">{{ item }}</li>
    </ul>
  </details>
</template>

<style scoped>
.inline-problem {
  margin-bottom: var(--space-3);
  border: 0.0625rem solid #d8e2f0;
  border-radius: 0.625rem;
  padding: var(--space-2) var(--space-3);
  background: #f7faff;
}

.inline-problem summary {
  cursor: pointer;
  color: #215b9b;
  font-size: 0.75rem;
  font-weight: 700;
}

.inline-problem-title {
  margin: var(--space-2) 0 0;
  color: var(--text-main);
  font-size: 0.875rem;
  font-weight: 700;
}

.inline-problem-body {
  margin: var(--space-1) 0 0;
  color: var(--text-sub);
  font-size: 0.8125rem;
  line-height: 1.5;
}

.inline-signature {
  margin: var(--space-2) 0 0;
  color: #204d86;
  font-size: 0.75rem;
  font-weight: 700;
}

.inline-list {
  margin: var(--space-2) 0 0;
  padding-left: 1.125rem;
  color: var(--text-sub);
  font-size: 0.75rem;
  line-height: 1.45;
}
</style>
