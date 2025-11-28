<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

onMounted(() => {
  // 初始化时检查登录状态
  userStore.checkLoginStatus()
})
</script>

<style>
/* 全局样式在 assets/style.css 中 */
</style>

