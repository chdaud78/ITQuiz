import { api } from '@/api/http.js'

export const quizApi = {
  get: () => api.get('/categories'),
  create: async (payload, opts) => await api.post('/api/quiz', payload, { auth: false }),
}
