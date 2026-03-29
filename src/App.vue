<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="brand-area">
        <p class="brand">Code Dojo</p>
      </div>

      <nav class="course-nav">
        <RouterLink to="/js-practice">JavaScript コース</RouterLink>
        <RouterLink to="/vue-practice">Vue コース</RouterLink>
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

@media (max-width: 56.25rem) {
  .app-header {
    grid-template-columns: 1fr;
    justify-items: start;
    padding: var(--space-3);
  }

  .course-nav {
    justify-content: flex-start;
    flex-wrap: wrap;
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
    width: 100%;
    display: grid;
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
</style>
