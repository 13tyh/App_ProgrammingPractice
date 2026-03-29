<script setup>
defineProps({
  isSolved: { type: Boolean, required: true }
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <button
    type="button"
    class="toggle-button"
    :class="isSolved ? 'undo-done' : 'mark-done'"
    :aria-pressed="isSolved"
    @click="emit('toggle')"
  >
    <span class="toggle-track" aria-hidden="true">
      <span class="toggle-thumb" />
    </span>
    <span class="toggle-text">{{ isSolved ? '未完了に戻す' : '完了にする' }}</span>
  </button>
</template>

<style scoped>
.toggle-button {
  border: 1px solid #c9d4e4;
  background: #ffffff;
  color: #2a3850;
  cursor: pointer;
  text-align: center;
  border-radius: var(--radius-md);
  padding: 7px var(--space-2);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.18s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.toggle-button:hover {
  transform: translateY(-1px);
}

.toggle-button.mark-done {
  color: #ffffff;
  background: linear-gradient(135deg, #0ea271 0%, #12805f 100%);
  border-color: #0f8a66;
  box-shadow: 0 8px 16px rgba(16, 128, 95, 0.28);
}

.toggle-button.mark-done .toggle-track {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.46);
}

.toggle-button.mark-done .toggle-thumb {
  background: #ffffff;
}

.toggle-button.undo-done {
  color: #7a2e2e;
  background: #fff4f4;
  border-color: #f2c5c5;
  box-shadow: inset 0 0 0 1px rgba(194, 90, 90, 0.08);
}

.toggle-track {
  width: 30px;
  height: 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(17, 24, 39, 0.25);
  position: relative;
}

.toggle-thumb {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #4b5563;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.18s ease;
}

.toggle-text {
  font-size: 12px;
  color: inherit;
}

.toggle-button.undo-done .toggle-track {
  background: rgba(194, 90, 90, 0.1);
  border-color: rgba(194, 90, 90, 0.45);
}

.toggle-button.undo-done .toggle-thumb {
  transform: translateX(12px);
  background: #b54747;
}
</style>
