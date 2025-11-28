<template>
  <div>
    <Navbar />
    
    <!-- 主内容区 -->
    <main class="container my-5">
      <!-- Hero Section -->
      <section class="text-center py-5">
        <h1 class="display-4 fw-bold text-primary">
          <i class="bi bi-lightbulb"></i> 智能学习计划生成器
        </h1>
        <p class="lead text-muted">
          让AI为你定制专属学习计划，轻松打卡，高效学习
        </p>
        <div class="mt-4">
          <router-link to="/create-plan" class="btn btn-primary btn-lg me-2">
            <i class="bi bi-plus-circle"></i> 立即创建计划
          </router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="btn btn-outline-primary btn-lg">
            <i class="bi bi-person"></i> 登录/注册
          </router-link>
        </div>
      </section>

      <!-- 功能介绍 -->
      <section class="py-5">
        <h2 class="text-center mb-5">核心功能</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div
                  class="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3 mx-auto"
                  style="width: 60px; height: 60px; line-height: 60px"
                >
                  <i class="bi bi-robot fs-4"></i>
                </div>
                <h5 class="card-title">AI智能生成</h5>
                <p class="card-text text-muted">
                  基于大语言模型，根据你的目标和时间，自动生成个性化学习计划
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div
                  class="feature-icon bg-success bg-gradient text-white rounded-circle mb-3 mx-auto"
                  style="width: 60px; height: 60px; line-height: 60px"
                >
                  <i class="bi bi-calendar-check fs-4"></i>
                </div>
                <h5 class="card-title">每日打卡</h5>
                <p class="card-text text-muted">
                  轻松打卡记录学习进度，查看连续打卡天数，培养学习习惯
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <div
                  class="feature-icon bg-warning bg-gradient text-white rounded-circle mb-3 mx-auto"
                  style="width: 60px; height: 60px; line-height: 60px"
                >
                  <i class="bi bi-graph-up fs-4"></i>
                </div>
                <h5 class="card-title">学习统计</h5>
                <p class="card-text text-muted">
                  可视化展示学习数据，日历热力图，进度追踪一目了然
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用流程 -->
      <section class="py-5 bg-light rounded-3">
        <h2 class="text-center mb-5">使用流程</h2>
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="row g-4">
              <div class="col-md-3 text-center">
                <div
                  class="step-number bg-primary text-white rounded-circle mx-auto mb-3"
                  style="width: 50px; height: 50px; line-height: 50px; font-size: 1.5rem"
                >
                  1
                </div>
                <h6>设定目标</h6>
                <p class="small text-muted">输入你想学习的内容和可用时间</p>
              </div>
              <div class="col-md-3 text-center">
                <div
                  class="step-number bg-primary text-white rounded-circle mx-auto mb-3"
                  style="width: 50px; height: 50px; line-height: 50px; font-size: 1.5rem"
                >
                  2
                </div>
                <h6>AI生成计划</h6>
                <p class="small text-muted">智能生成详细的每日学习任务</p>
              </div>
              <div class="col-md-3 text-center">
                <div
                  class="step-number bg-primary text-white rounded-circle mx-auto mb-3"
                  style="width: 50px; height: 50px; line-height: 50px; font-size: 1.5rem"
                >
                  3
                </div>
                <h6>每日打卡</h6>
                <p class="small text-muted">完成学习后打卡记录</p>
              </div>
              <div class="col-md-3 text-center">
                <div
                  class="step-number bg-primary text-white rounded-circle mx-auto mb-3"
                  style="width: 50px; height: 50px; line-height: 50px; font-size: 1.5rem"
                >
                  4
                </div>
                <h6>查看成果</h6>
                <p class="small text-muted">统计数据见证你的进步</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)
</script>

