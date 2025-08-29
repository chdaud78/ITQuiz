import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { auth } from '@/api/auth.js'
import { token } from '@/api/token.js'
import { ROUTES } from '@/lib/routes.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    await auth.login({ email, password }).then((res) => {
      token.set(res.data.token)
      alert('로그인이 완료되었습니다.')
      navigate(ROUTES.HOME)
    })
  }

  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-2xl p-8 mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">로그인</h2>

      <div className="flex flex-col mb-5">
        <label className="text-sm font-medium text-gray-600 mb-2">이메일</label>
        <input
          type="text"
          placeholder="이메일을 입력하세요"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col mb-6">
        <label className="text-sm font-medium text-gray-600 mb-2">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="button"
        onClick={handleLogin}
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
      >
        로그인
      </button>

      <p className="mt-5 text-center text-sm text-gray-500">
        계정이 없으신가요?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  )
}
