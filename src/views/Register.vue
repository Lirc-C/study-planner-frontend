<template>
  <div class="bg-light" style="min-height: 100vh;">
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-5">
          <div class="card shadow">
            <div class="card-body p-5">
              <div class="text-center mb-4">
                <h2><i class="bi bi-book text-primary"></i></h2>
                <h4>注册</h4>
                <p class="text-muted">创建你的账户</p>
              </div>

              <form @submit.prevent="handleRegister">
                <div class="mb-3">
                  <label for="username" class="form-label">用户名</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="username"
                    required
                    minlength="3"
                  />
                  <small class="text-muted">至少3个字符</small>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">邮箱</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">密码</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    required
                    minlength="6"
                  />
                  <small class="text-muted">至少6个字符</small>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">确认密码</label>
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    required
                  />
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary btn-lg" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    注册
                  </button>
                </div>
              </form>

              <hr class="my-4" />

              <p class="text-center mb-0">
                已有账号？<router-link to="/login">立即登录</router-link>
              </p>
            </div>
          </div>

          <div class="text-center mt-3">
            <router-link to="/" class="text-muted">
              <i class="bi bi-arrow-left"></i> 返回首页
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { showToast } from '../utils/toast'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

async function handleRegister() {
  if (password.value !== confirmPassword.value) {
    showToast('两次输入的密码不一致', 'error')
    return
  }

  loading.value = true
  
  try {
    const result = await userStore.register(username.value, password.value, email.value)
    
    if (result.success) {
      showToast('注册成功！请登录', 'success')
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    } else {
      showToast(result.message || '注册失败', 'error')
    }
  } finally {
    loading.value = false
  }
}
</script>

