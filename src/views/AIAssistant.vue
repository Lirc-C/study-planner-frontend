<template>
  <div>
    <Navbar />
    
    <main class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="card shadow">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0"><i class="bi bi-robot"></i> AI学习助手</h5>
              <small>智能问答，解决学习疑惑</small>
            </div>
            <div class="card-body">
              <!-- 聊天消息容器 -->
              <div class="chat-container" ref="chatContainer">
                <div
                  v-for="(msg, index) in messages"
                  :key="index"
                  :class="['chat-message', msg.role === 'user' ? 'user' : 'ai', 'd-flex']"
                  :style="msg.role === 'user' ? 'justify-content: flex-end' : ''"
                >
                  <div>
                    <div v-if="msg.role === 'assistant'" class="small text-muted mb-1">
                      <i class="bi bi-robot"></i> AI助手
                    </div>
                    <div>{{ msg.content }}</div>
                  </div>
                </div>
                
                <!-- 加载中 -->
                <div v-if="loading" class="chat-message ai">
                  <div class="loading-spinner"></div>
                  <span class="ms-2">AI正在思考...</span>
                </div>
              </div>

              <!-- 输入区域 -->
              <form @submit.prevent="sendMessage" class="mt-3">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="userInput"
                    placeholder="输入您的问题..."
                    :disabled="loading"
                    required
                  />
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="loading || !userInput.trim()"
                  >
                    <i class="bi bi-send"></i> 发送
                  </button>
                </div>
              </form>

              <!-- 建议问题 -->
              <div class="mt-3">
                <small class="text-muted">建议问题：</small>
                <div class="d-flex flex-wrap gap-2 mt-2">
                  <button
                    v-for="(question, index) in suggestedQuestions"
                    :key="index"
                    class="btn btn-sm btn-outline-secondary"
                    @click="askQuestion(question)"
                    :disabled="loading"
                  >
                    {{ question }}
                  </button>
                </div>
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
import { ref, nextTick, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { aiApi } from '../api/ai'
import { showToast } from '../utils/toast'

const messages = ref([])
const userInput = ref('')
const loading = ref(false)
const chatContainer = ref(null)

const suggestedQuestions = [
  '如何高效学习编程？',
  '推荐一些学习资源',
  '如何保持学习动力？',
  '制定学习计划的技巧'
]

onMounted(() => {
  // 加载历史消息
  const savedHistory = localStorage.getItem('aiChatHistory')
  if (savedHistory) {
    messages.value = JSON.parse(savedHistory)
  } else {
    // 添加欢迎消息
    messages.value.push({
      role: 'assistant',
      content: '你好！我是你的AI学习助手，有什么可以帮助你的吗？'
    })
  }
})

async function sendMessage() {
  if (!userInput.value.trim()) return

  const question = userInput.value
  userInput.value = ''

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: question
  })

  scrollToBottom()
  loading.value = true

  try {
    const result = await aiApi.chat(messages.value)

    if (result && result.code === 200) {
      // 添加AI回复
      messages.value.push({
        role: 'assistant',
        content: result.data.content || result.data
      })
      
      // 保存到本地
      localStorage.setItem('aiChatHistory', JSON.stringify(messages.value))
      scrollToBottom()
    } else {
      showToast(result?.message || '请求失败', 'error')
    }
  } catch (error) {
    console.error('发送消息失败:', error)
    showToast('网络错误，请稍后重试', 'error')
  } finally {
    loading.value = false
  }
}

function askQuestion(question) {
  userInput.value = question
  sendMessage()
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}
</script>

