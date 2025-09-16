import { api } from '@/api/http.js'

export const quizApi = {
  getList: () => api.get('/api/quizzes'),
  delete: (quizId) => api.delete(`/api/quiz/${quizId}`),
  getSession: (sessionId) => api.get(`/api/quiz/session/${sessionId}`),
  create: async (payload, opts) => await api.post('/api/quiz', payload),
  submit: async (sessionId, payload, opts) =>
    await api.post(`/api/quiz/session/${sessionId}/submit`, payload),
  getResult: (sessionId) => api.get(`/api/quiz/session/${sessionId}/result`),
}
