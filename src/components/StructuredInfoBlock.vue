<script setup>
defineProps({
  title: { type: String, required: true },
  objective: { type: String, default: '' },
  sections: {
    type: Array,
    default: () => []
  },
  review: { type: String, default: '' }
})
</script>

<template>
  <section class="design-block">
    <p class="design-title">{{ title }}</p>
    <p v-if="objective" class="design-objective">{{ objective }}</p>

    <template v-for="section in sections" :key="section.title">
      <p class="design-subtitle">{{ section.title }}</p>
      <component :is="section.ordered ? 'ol' : 'ul'" class="design-list" :class="{ ordered: section.ordered }">
        <li v-for="item in section.items" :key="item">{{ item }}</li>
      </component>
    </template>

    <p v-if="review" class="design-review">{{ review }}</p>
  </section>
</template>

<style scoped>
.design-block {
  margin-top: var(--space-3);
  border: 0.0625rem solid #dfe3eb;
  border-radius: var(--radius-md);
  background: #f8f9fb;
  padding: var(--space-3);
}

.design-title {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #2d5fa3;
  text-transform: uppercase;
}

.design-objective {
  margin: var(--space-2) 0 0;
  color: var(--text-main);
  line-height: 1.5;
}

.design-subtitle {
  margin: var(--space-3) 0 var(--space-1);
  color: #326db4;
  font-size: 0.75rem;
  font-weight: 700;
}

.design-list {
  margin: 0;
  padding-left: 1.125rem;
  color: var(--text-sub);
  line-height: 1.45;
  font-size: 0.8125rem;
}

.design-list li + li {
  margin-top: var(--space-1);
}

.design-list.ordered {
  list-style: decimal;
}

.design-review {
  margin: var(--space-3) 0 0;
  color: var(--text-sub);
  font-size: 0.75rem;
}
</style>
