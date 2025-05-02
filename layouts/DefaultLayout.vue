<script setup lang="ts">
import { RouterView } from 'vue-router'
import DefaultHeader from './DefaultHeader.vue'
</script>

<template>
  <DefaultHeader />
  <div class="bg-gray-200 main-container p-4">
    <RouterView />
  </div>
</template>
<style lang="scss" scoped>
.main-container {
  height: calc(100vh - 58px);
}
</style>
