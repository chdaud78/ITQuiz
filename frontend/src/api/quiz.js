import { api } from '@/api/http.js'

export const quizApi = {
  getList: (params = {}) => api.get('/api/quizzes', { params }),
  delete: (quizId) => api.delete(`/api/quiz/${quizId}`),
  update: (quizId, payload) => api.put(`/api/quiz/${quizId}`, payload),
  getSession: (sessionId) => api.get(`/api/quiz/session/${sessionId}`),
  create: async (payload, opts) => await api.post('/api/quiz', payload),
  submit: async (sessionId, payload, opts) =>
    await api.post(`/api/quiz/session/${sessionId}/submit`, payload),
  getResult: (sessionId) => api.get(`/api/quiz/session/${sessionId}/result`),
}
