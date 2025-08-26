import { api } from '@/api/http.js'

export const categoryApi = {
  get: () => api.get('/api/categories'),
  create: async (payload, opts) => await api.post('/api/category', payload, { auth: false }),
}
