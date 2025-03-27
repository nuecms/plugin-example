<template>
  <div class="example-plugin-layout">
    <header class="plugin-header">
      <div class="container">
        <h1 class="plugin-title">Example Plugin</h1>
        <nav class="plugin-nav">
          <NuxtLink to="/plugin/example">Home</NuxtLink>
          <NuxtLink to="/">Back to Site</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="container">
      <slot />
    </main>

    <footer class="plugin-footer">
      <div class="container">
        <p>Example Plugin - This is a custom plugin layout</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.example-plugin-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.plugin-header {
  background-color: #4CAF50;
  color: white;
  padding: 1rem 0;
}

.plugin-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plugin-title {
  margin: 0;
  font-size: 1.5rem;
}

.plugin-nav {
  display: flex;
  gap: 1rem;
}

.plugin-nav a {
  color: white;
  text-decoration: none;
}

.plugin-nav a:hover {
  text-decoration: underline;
}

main {
  flex: 1;
  padding: 2rem 0;
}

.plugin-footer {
  background-color: #f5f5f5;
  padding: 1rem 0;
  text-align: center;
  color: #666;
}
</style>
