<script setup>
const props = defineProps({
  shortText: { type: String, default: '' },
  detailText: { type: String, default: '' },
  level: { type: String, default: 'high' },
  mode: { type: String, default: 'detail' }
})

const resolvedText = () => {
  if (props.mode === 'compact') return props.shortText
  return props.detailText
}
</script>

<template>
  <p
    v-if="resolvedText()"
    class="mutation-warning"
    :class="[level === 'high' ? 'is-high' : 'is-caution', mode === 'compact' ? 'is-compact' : 'is-detail']"
  >
    <template v-if="mode === 'compact'">WARNING: {{ resolvedText() }}</template>
    <template v-else>{{ resolvedText() }}</template>
  </p>
</template>

<style scoped>
.mutation-warning {
  border-radius: 0.625rem;
  border: 0.0625rem solid transparent;
  line-height: 1.5;
  font-weight: 650;
}

.mutation-warning.is-detail {
  margin: var(--space-2) 0 0;
  padding: 0.625rem 0.75rem;
  font-size: 0.75rem;
}

.mutation-warning.is-compact {
  margin-top: var(--space-2) !important;
  padding: 0.375rem 0.625rem;
  font-size: 0.75rem !important;
}

.mutation-warning.is-high {
  color: #b42318;
  background: #fff1f1;
  border-color: #ffd2d2;
}

.mutation-warning.is-caution {
  color: #8a4b00;
  background: #fff8e8;
  border-color: #ffe2b8;
}
</style>
