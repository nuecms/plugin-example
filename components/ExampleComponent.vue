<template>
  <div class="example-component">
    <h3 class="title">{{ title }}</h3>
    <div class="content">
      <slot></slot>
    </div>
    <div v-if="showFooter" class="footer">
      <button class="btn" @click="handleClick">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Example Component'
  },
  buttonText: {
    type: String,
    default: 'Click Me'
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.example-component {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  margin: 15px 0;
}

.title {
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.content {
  padding: 10px 0;
}

.footer {
  padding-top: 10px;
  border-top: 1px solid #eee;
  text-align: right;
}

.btn {
  padding: 5px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049;
}
</style>
