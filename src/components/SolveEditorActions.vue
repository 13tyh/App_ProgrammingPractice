<script setup>
defineProps({
  showRun: { type: Boolean, default: false },
  isRunning: { type: Boolean, default: false },
  isChecking: { type: Boolean, default: false }
})

const emit = defineEmits(['run', 'check', 'reset'])
</script>

<template>
  <div class="actions">
    <button v-if="showRun" type="button" :disabled="isRunning || isChecking" @click="emit('run')">
      {{ isRunning ? '実行中...' : '実行' }}
    </button>
    <button type="button" class="primary" :disabled="isRunning || isChecking" @click="emit('check')">
      {{ isChecking ? 'チェック中...' : 'チェック' }}
    </button>
    <button type="button" class="ghost" :disabled="isRunning || isChecking" @click="emit('reset')">リセット</button>
  </div>

  <p v-if="isRunning || isChecking" class="busy-note">
    {{ isChecking ? 'チェックを実行しています。しばらくお待ちください。' : 'コードを実行しています。しばらくお待ちください。' }}
  </p>
</template>

<style scoped>
.actions {
  margin-top: var(--space-3);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

button {
  border: 0.0625rem solid var(--line);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  background: #ffffff;
  color: var(--text-main);
  cursor: pointer;
  font-weight: 700;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.64;
}

button.primary {
  background: var(--accent);
  color: #ffffff;
  border-color: transparent;
}

button.ghost {
  background: #f4f7fb;
  color: #2d4f79;
}

.busy-note {
  margin-top: var(--space-2);
  font-size: 0.75rem;
  color: #2d5fa3;
  font-weight: 700;
}
</style>
