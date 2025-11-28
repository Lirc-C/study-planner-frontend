<template>
  <div>
    <Navbar />
    
    <main class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0"><i class="bi bi-person-circle"></i> 个人资料</h5>
            </div>
            <div class="card-body p-4">
              <!-- 基本信息 -->
              <div class="mb-4">
                <h6 class="text-muted mb-3">基本信息</h6>
                <div class="row mb-3">
                  <label class="col-sm-3 col-form-label">用户名</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" :value="user?.username" disabled />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-3 col-form-label">邮箱</label>
                  <div class="col-sm-9">
                    <input type="email" class="form-control" v-model="profileData.email" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-3 col-form-label">注册时间</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" :value="formatDateTime(user?.createTime)" disabled />
                  </div>
                </div>
                <div class="text-end">
                  <button class="btn btn-primary" @click="updateProfile" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    <i v-else class="bi bi-check"></i>
                    保存修改
                  </button>
                </div>
              </div>

              <hr />

              <!-- 修改密码 -->
              <div class="mb-4">
                <h6 class="text-muted mb-3">修改密码</h6>
                <form @submit.prevent="changePassword">
                  <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">原密码</label>
                    <div class="col-sm-9">
                      <input
                        type="password"
                        class="form-control"
                        v-model="passwordData.oldPassword"
                        required
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">新密码</label>
                    <div class="col-sm-9">
                      <input
                        type="password"
                        class="form-control"
                        v-model="passwordData.newPassword"
                        minlength="6"
                        required
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">确认新密码</label>
                    <div class="col-sm-9">
                      <input
                        type="password"
                        class="form-control"
                        v-model="passwordData.confirmPassword"
                        required
                      />
                    </div>
                  </div>
                  <div class="text-end">
                    <button type="submit" class="btn btn-warning" :disabled="passwordLoading">
                      <span v-if="passwordLoading" class="spinner-border spinner-border-sm me-2"></span>
                      <i v-else class="bi bi-key"></i>
                      修改密码
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { useUserStore } from '../stores/user'
import { userApi } from '../api/user'
import { showToast } from '../utils/toast'
import { formatDateTime } from '../utils/format'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const loading = ref(false)
const passwordLoading = ref(false)

const profileData = reactive({
  email: ''
})

const passwordData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

onMounted(() => {
  if (user.value) {
    profileData.email = user.value.email || ''
  }
})

async function updateProfile() {
  loading.value = true
  
  try {
    const result = await userApi.updateProfile(profileData)
    if (result && result.code === 200) {
      showToast('资料更新成功', 'success')
      await userStore.checkLoginStatus()
    } else {
      showToast(result?.message || '更新失败', 'error')
    }
  } catch (error) {
    console.error('更新资料失败:', error)
    showToast('更新失败', 'error')
  } finally {
    loading.value = false
  }
}

async function changePassword() {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    showToast('两次输入的密码不一致', 'error')
    return
  }

  passwordLoading.value = true
  
  try {
    const result = await userApi.changePassword(
      passwordData.oldPassword,
      passwordData.newPassword
    )
    
    if (result && result.code === 200) {
      showToast('密码修改成功，请重新登录', 'success')
      
      // 清空表单
      passwordData.oldPassword = ''
      passwordData.newPassword = ''
      passwordData.confirmPassword = ''
      
      // 登出并跳转到登录页
      setTimeout(() => {
        userStore.logout()
        window.location.href = '/login'
      }, 1500)
    } else {
      showToast(result?.message || '修改失败', 'error')
    }
  } catch (error) {
    console.error('修改密码失败:', error)
    showToast('修改失败', 'error')
  } finally {
    passwordLoading.value = false
  }
}
</script>

