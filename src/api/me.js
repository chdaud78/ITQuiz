import { api } from '@/api/http.js'

export const me = {
  get: () => api.get('/me'),
}
