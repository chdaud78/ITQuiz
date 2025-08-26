import { api } from '@/api/http.js'

export const quizApi = {
  get: () => api.get('/categories'),
  create: async (payload, opts) => await api.post('/category', payload, { auth: false }),
}
