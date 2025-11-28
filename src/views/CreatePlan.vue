<template>
  <div>
    <Navbar />
    
    <main class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0"><i class="bi bi-magic"></i> 创建学习计划</h5>
            </div>
            <div class="card-body p-4">
              <form @submit.prevent="handleSubmit">
                <!-- 学习目标 -->
                <div class="mb-4">
                  <label for="goal" class="form-label fw-bold">
                    <i class="bi bi-bullseye text-primary"></i> 学习目标
                  </label>
                  <textarea
                    class="form-control"
                    id="goal"
                    v-model="formData.goal"
                    rows="3"
                    required
                    placeholder="例如：学习Python编程，掌握基础语法、数据结构和常用库，能够独立完成小项目"
                  ></textarea>
                  <div class="form-text">详细描述你想学习的内容和期望达到的水平</div>
                </div>

                <!-- 基础水平 -->
                <div class="mb-4">
                  <label for="level" class="form-label fw-bold">
                    <i class="bi bi-bar-chart text-success"></i> 当前基础
                  </label>
                  <select class="form-select" id="level" v-model="formData.level" required>
                    <option value="零基础">零基础 - 完全没接触过</option>
                    <option value="初级">初级 - 了解基本概念</option>
                    <option value="中级">中级 - 有一定实践经验</option>
                    <option value="高级">高级 - 希望深入提升</option>
                  </select>
                </div>

                <div class="row">
                  <!-- 每日学习时间 -->
                  <div class="col-md-6 mb-4">
                    <label for="dailyHours" class="form-label fw-bold">
                      <i class="bi bi-clock text-warning"></i> 每日学习时间
                    </label>
                    <div class="input-group">
                      <input
                        type="number"
                        class="form-control"
                        id="dailyHours"
                        v-model.number="formData.dailyHours"
                        min="0.5"
                        max="12"
                        step="0.5"
                        required
                      />
                      <span class="input-group-text">小时</span>
                    </div>
                  </div>

                  <!-- 计划天数 -->
                  <div class="col-md-6 mb-4">
                    <label for="totalDays" class="form-label fw-bold">
                      <i class="bi bi-calendar3 text-info"></i> 计划天数
                    </label>
                    <div class="input-group">
                      <input
                        type="number"
                        class="form-control"
                        id="totalDays"
                        v-model.number="formData.totalDays"
                        min="1"
                        max="365"
                        required
                      />
                      <span class="input-group-text">天</span>
                    </div>
                  </div>
                </div>

                <!-- 计划标题 -->
                <div class="mb-4">
                  <label for="title" class="form-label fw-bold">
                    <i class="bi bi-card-heading text-secondary"></i> 计划标题（可选）
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="formData.title"
                    placeholder="不填则由AI自动生成"
                  />
                </div>

                <!-- 提交按钮 -->
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary btn-lg" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    <i v-else class="bi bi-robot"></i>
                    {{ loading ? 'AI正在生成计划...' : 'AI生成学习计划' }}
                  </button>
                </div>
              </form>

              <!-- 生成结果区域 -->
              <div v-if="showResult" class="mt-4">
                <hr />
                <h5><i class="bi bi-check-circle text-success"></i> 计划生成成功！</h5>
                <div class="alert alert-success">
                  <strong>{{ resultPlan.title || resultPlan.goal }}</strong><br />
                  <small>计划天数：{{ resultPlan.totalDays }}天</small>
                </div>
                <div class="d-grid gap-2">
                  <router-link to="/my-plans" class="btn btn-success">
                    <i class="bi bi-list-check"></i> 查看我的计划
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- 提示卡片 -->
          <div class="card mt-4 border-info">
            <div class="card-body">
              <h6 class="card-title text-info"><i class="bi bi-lightbulb"></i> 小提示</h6>
              <ul class="mb-0 small text-muted">
                <li>目标描述越详细，生成的计划越精准</li>
                <li>建议每天学习时间2-4小时，保持可持续性</li>
                <li>计划会自动保存到您的账户</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { planApi } from '../api/plan'
import { showToast } from '../utils/toast'

const router = useRouter()

const formData = reactive({
  goal: '',
  level: '零基础',
  dailyHours: 2,
  totalDays: 30,
  title: ''
})

const loading = ref(false)
const showResult = ref(false)
const resultPlan = ref({})

async function handleSubmit() {
  loading.value = true
  showResult.value = false

  try {
    const result = await planApi.generatePlan(formData)

    if (result && result.code === 200) {
      showToast('计划生成成功！', 'success')
      resultPlan.value = result.data
      showResult.value = true
    } else {
      showToast(result?.message || '生成失败，请重试', 'error')
    }
  } catch (error) {
    console.error('生成计划失败:', error)
    showToast('网络错误，请稍后重试', 'error')
  } finally {
    loading.value = false
  }
}
</script>

