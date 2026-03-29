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
    padding: var(--space-3);
  }

  .course-nav {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .app-header {
    gap: var(--space-2);
    border-radius: var(--radius-md);
  }

  .brand {
    font-size: 18px;
  }

  .course-nav {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }

  .course-nav a {
    text-align: center;
    padding: 9px 8px;
    font-size: 13px;
  }

  .app-main {
    padding: 8px 2px 12px;
  }
}

@media (max-width: 430px) {
  .app-header {
    padding: 8px;
  }

  .course-nav {
    grid-template-columns: 1fr;
  }

  .course-nav a {
    min-height: 40px;
    display: grid;
    place-items: center;
  }
}
</style>
