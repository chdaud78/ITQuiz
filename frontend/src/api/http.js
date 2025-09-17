import axios from 'axios'

import { token } from '@/api/token.js'

const BASEURL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : window.location.origin
export const api = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const res = await axios.post(`${BASEURL}/auth/refresh`, {}, { withCredentials: true })
        token.set(res.data.token)

        originalRequest.headers.Authorization = `Bearer ${res.data.token}`
        return axios(originalRequest)
      } catch (refreshErr) {
        token.clear()
        return Promise.reject(refreshErr)
      }
    }

    return Promise.reject(error)
  }
)

api.interceptors.request.use(
  (config) => {
    const t = token.get()
    if (t) {
      config.headers.Authorization = `Bearer ${t}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
