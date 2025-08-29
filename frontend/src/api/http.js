import axios from 'axios'

import { token } from '@/api/token.js'

const BASEURL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : '/api'
export const api = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 로그인 시도 실패, 토큰 정보 삭제
    if (error.response?.status === 401) {
      token.clear()
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
