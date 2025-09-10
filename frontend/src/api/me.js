import { api } from '@/api/http.js'

export const me = {
  get: () => api.get('/me'),
  patchMe: async (updatedProfile) => api.patch('/me', updatedProfile),
  changePassword: async ({ currentPassword, newPassword }) =>
    api.patch('/me/password', {
      currentPassword,
      newPassword,
    }),
  getStats: () => api.get('/api/user/stats'),
  getHistory: () => api.get('/api/user/history'),
  getCHistory: () => api.get('/api/user/category-stats'),
}
