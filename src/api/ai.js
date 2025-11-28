import request from './request'

export const aiApi = {
  // 发送聊天消息
  chat(messages) {
    return request({
      url: '/ai/chat',
      method: 'POST',
      data: { messages }
    })
  }
}

