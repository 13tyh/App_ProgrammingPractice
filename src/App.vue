<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isNavOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    isNavOpen.value = false
  }
)

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const closeNav = () => {
  isNavOpen.value = false
}
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="brand-area">
        <p class="brand">Code Dojo</p>
      </div>

      <button
        type="button"
        class="hamburger-button"
        :aria-expanded="isNavOpen"
        aria-controls="course-nav"
        aria-label="ナビゲーションを開閉"
        @click="toggleNav"
      >
        <span class="hamburger-line" />
        <span class="hamburger-line" />
        <span class="hamburger-line" />
      </button>

      <nav id="course-nav" class="course-nav" :class="{ open: isNavOpen }">
        <RouterLink to="/js-practice" @click="closeNav">JavaScript コース</RouterLink>
        <RouterLink to="/vue-practice" @click="closeNav">Vue コース</RouterLink>
      </nav>

    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: transparent;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-5);
  border: 0.0625rem solid #e3e3e8;
  border-radius: var(--radius-lg);
  background: var(--surface);
  backdrop-filter: blur(0.875rem) saturate(130%);
  box-shadow: var(--shadow-card);
}

.brand {
  margin: 0;
  color: var(--heading);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.hamburger-button {
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid #dcdde3;
  background: #ffffff;
  color: var(--text-main);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 0.1875rem;
  flex-direction: column;
}

.hamburger-line {
  width: 1rem;
  height: 0.125rem;
  border-radius: 0.125rem;
  background: currentColor;
}

.course-nav {
  display: flex;
  gap: var(--space-2);
  justify-content: center;
}

.course-nav a {
  color: var(--text-main);
  text-decoration: none;
  font-weight: 600;
  border: 0.0625rem solid #dcdde3;
  border-radius: 62.4375rem;
  padding: 0.4375rem var(--space-3);
  background: #ffffff;
}

.course-nav a:hover {
  transform: translateY(-0.0625rem);
  box-shadow: 0 0.375rem 1rem rgba(15, 23, 42, 0.08);
}

.course-nav a.router-link-active {
  color: #ffffff;
  border-color: transparent;
  background: var(--accent);
  box-shadow: 0 0.375rem 1rem rgba(0, 113, 227, 0.28);
}

.app-main {
  max-width: var(--layout-max-w);
  margin: 0 auto;
  padding: var(--space-3) 0.375rem 0.875rem;
}

@media (max-width: 48rem) {
  .app-header {
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: var(--space-3);
  }

  .hamburger-button {
    display: inline-flex;
  }

  .course-nav {
    width: 100%;
    grid-column: 1 / -1;
    margin-top: var(--space-2);
    display: none;
    grid-template-columns: 1fr 1fr;
    justify-content: stretch;
  }

  .course-nav.open {
    display: grid;
  }
}

@media (max-width: 37.5rem) {
  .app-header {
    gap: var(--space-2);
    border-radius: var(--radius-md);
  }

  .brand {
    font-size: 1.125rem;
  }

  .course-nav {
    grid-template-columns: 1fr 1fr;
    gap: 0.375rem;
  }

  .course-nav a {
    text-align: center;
    padding: 0.5625rem 0.5rem;
    font-size: 0.8125rem;
  }

  .app-main {
    padding: 0.5rem 0.125rem 0.75rem;
  }
}

@media (max-width: 26.875rem) {
  .app-header {
    padding: 0.5rem;
  }

  .course-nav {
    grid-template-columns: 1fr;
  }

  .course-nav a {
    min-height: 2.5rem;
    display: grid;
    place-items: center;
  }
}

@media (max-width: 18.75rem) {
  .app-header {
    padding: 0.375rem;
    gap: 0.375rem;
  }

  .brand {
    font-size: 1rem;
  }

  .course-nav a {
    min-height: 2.25rem;
    padding: 0.375rem;
    font-size: 0.75rem;
  }

  .app-main {
    padding: 0.375rem 0.0625rem 0.5rem;
  }
}
</style>
