import { api } from '@/api/http.js'

export const me = {
  get: () => api.get('/me'),
  getStats: () => api.get('/api/user/stats'),
  getHistory: () => api.get('/api/user/history'),
  getCHistory: () => api.get('/api/user/category-stats'),
}
