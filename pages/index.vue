<template>
  <div class="plugin-example-page">
    <h1>Example Plugin</h1>
    <p>This is a sample page from the example plugin</p>

    <div v-if="loading" class="loading">
      Loading data...
    </div>

    <div v-else-if="data.length" class="data-list">
      <div v-for="item in data" :key="item.id" class="data-item">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
        <div class="meta">
          Created: {{ formatDate(item.created_at) }}
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      No data found
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Only define the page meta once
definePageMeta({
  layout: 'example-default',
  title: 'Example Plugin'
})

const loading = ref(true)
const data = ref([])

// Load data from the example plugin API
const fetchData = async () => {
  try {
    const response = await fetch('/api/example')
    const result = await response.json()

    if (result.success) {
      data.value = result.data.list || []
    } else {
      console.error('Error loading data:', result.message)
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleString()
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.plugin-example-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.data-list {
  margin-top: 20px;
}

.data-item {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.meta {
  font-size: 12px;
  color: #666;
  margin-top: 10px;
}

.loading, .empty-state {
  padding: 40px;
  text-align: center;
  color: #666;
}
</style>
