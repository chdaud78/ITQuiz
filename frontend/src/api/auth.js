import { api } from '@/api/http.js'
import { token } from '@/api/token.js'

export const auth = {
  login: async (payload, opts) => {
    const response = await api.post('/auth/login', payload, { auth: false })
    response.token ? token.set(response.token) : token.clear()
    return response
  },
  register: async (payload, opts) => await api.post('/auth/register', payload, { auth: false }),
  logout: async () => {
    try {
      await api.post('/auth/logout', {}, { auth: true })
    } finally {
      token.clear()
    }
  },
}
