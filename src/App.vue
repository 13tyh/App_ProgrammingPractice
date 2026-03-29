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
  border: 1px solid #e3e3e8;
  border-radius: var(--radius-lg);
  background: var(--surface);
  backdrop-filter: blur(14px) saturate(130%);
  box-shadow: var(--shadow-card);
}

.brand {
  margin: 0;
  color: var(--heading);
  font-size: 20px;
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
  border: 1px solid #dcdde3;
  border-radius: 999px;
  padding: 7px var(--space-3);
  background: #ffffff;
}

.course-nav a:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
}

.course-nav a.router-link-active {
  color: #ffffff;
  border-color: transparent;
  background: var(--accent);
  box-shadow: 0 6px 16px rgba(0, 113, 227, 0.28);
}

.app-main {
  max-width: var(--layout-max-w);
  margin: 0 auto;
  padding: var(--space-3) 6px 14px;
}

@media (max-width: 900px) {
  .app-header {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .course-nav {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>
