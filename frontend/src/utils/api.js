import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 30000,
  withCredentials: true
})

// Request interceptor
api.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - 不在拦截器里强制跳转，由调用方/路由守卫处理
          // 这样未登录用户也能正常浏览公开页面（首页、商品、分类等）
          break
        case 403:
          // Forbidden
          console.error('Access denied')
          break
        case 404:
          // Not found
          console.error('Resource not found')
          break
        case 500:
          // Server error
          console.error('Server error')
          break
      }
    }
    return Promise.reject(error)
  }
)

export default api
