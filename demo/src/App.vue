<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', label: 'Basic' },
  { path: '/custom-fonts', label: 'Custom Fonts' },
  { path: '/edge-options', label: 'Edge Options' },
  { path: '/node-customization', label: 'Node Customization' },
  { path: '/node-ordering', label: 'Node Ordering' },
  { path: '/tooltip', label: 'Tooltip' },
  { path: '/reactive', label: 'Reactive Data' },
  { path: '/ref', label: 'Using Refs' }
]

const currentTitle = computed(() => {
  const item = navItems.find(item => item.path === route.path)
  return item?.label || 'Demo'
})
</script>

<template>
  <div class="app">
    <aside class="sidebar">
      <div class="logo">
        <h1>Vue ApexSankey</h1>
        <span class="version">Demo</span>
      </div>
      
      <nav class="nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ active: route.path === item.path }"
        >
          {{ item.label }}
        </router-link>
      </nav>
    </aside>

    <main class="main">
      <header class="header">
        <h2>{{ currentTitle }}</h2>
      </header>
      
      <div class="content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #f5f5f5;
  color: #1a1a1a;
}

.app {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: #1a1a1a;
  color: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.logo {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #333;
}

.logo h1 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.logo .version {
  font-size: 12px;
  color: #888;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-link {
  padding: 12px 16px;
  border-radius: 8px;
  color: #aaa;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: #333;
  color: #fff;
}

.nav-link.active {
  background: #2563eb;
  color: #fff;
}

.main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  padding: 20px 32px;
  border-bottom: 1px solid #e5e5e5;
}

.header h2 {
  font-size: 24px;
  font-weight: 600;
}

.content {
  flex: 1;
  padding: 32px;
}
</style>
