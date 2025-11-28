import { Toast } from 'bootstrap'

/**
 * 显示提示消息
 * @param {string} message - 提示消息
 * @param {string} type - 消息类型: success, error, warning, info
 */
export function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer')
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.id = 'toastContainer'
    toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3'
    toastContainer.style.zIndex = '9999'
    document.body.appendChild(toastContainer)
  }
  
  const toastId = 'toast-' + Date.now()
  const bgClass = {
    'success': 'bg-success',
    'error': 'bg-danger',
    'warning': 'bg-warning',
    'info': 'bg-info'
  }[type] || 'bg-info'
  
  const toastHtml = `
    <div id="${toastId}" class="toast ${bgClass} text-white" role="alert">
      <div class="toast-body d-flex justify-content-between align-items-center">
        ${message}
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `
  
  toastContainer.insertAdjacentHTML('beforeend', toastHtml)
  
  const toastElement = document.getElementById(toastId)
  const toast = new Toast(toastElement, { delay: 3000 })
  toast.show()
  
  toastElement.addEventListener('hidden.bs.toast', () => {
    toastElement.remove()
  })
}

