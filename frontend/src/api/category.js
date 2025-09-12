import { api } from '@/api/http.js'

export const categoryApi = {
  get: () => api.get('/api/categories'),
  create: async (payload, opts) => await api.post('/api/category', payload, { auth: false }),
  startSession: async (payload, opts) =>
    await api.post('/api/quiz/session/start', payload, { auth: false }),
  delete: async (id) => await api.delete(`/api/category/${id}`),
}
