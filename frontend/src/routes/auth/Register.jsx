import { useState } from 'react'
import { useNavigate } from 'react-router'

import { auth } from '@/api/auth.js'
import { ROUTES } from '@/lib/routes.js'

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) {
      e.name = '이름을 입력하세요.'
    }
    if (!/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(form.email)) {
      e.email = '이메일 형식이 올바르지 않습니다.'
    }
    if (!form.password) {
      e.password = '비밀번호를 입력하세요.'
    }
    if (form.password !== form.confirm || !form.confirm) {
      e.confirm = '비밀번호가 일치하지 않습니다.'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      return
    }
    auth
      .register({ name: form.name, email: form.email, password: form.password })
      .then(() => {
        alert('회원가입 성공')
        navigate(ROUTES.AUTH.LOGIN)
      })
      .catch((e) => {
        console.error(e)
        if (e.status === 409) {
          alert('이미 존재하는 이메일 입니다.')
        }
      })
  }

  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 mx-auto flex">
      <div className="w-100 flex-1">
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">회원 가입</h2>
        </div>
        <div className="flex flex-col">
          <form action="" onSubmit={onSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="">이름</label>
              <input
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                name="name"
                value={form.name}
                onChange={onChange}
                type="text"
              />
              {errors.name ? <p className="text-sm text-red-500">{errors.name}</p> : ''}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="">이메일</label>
              <input
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                name="email"
                value={form.email}
                onChange={onChange}
                type="text"
              />
              {errors.email ? <p className="text-sm text-red-500">{errors.email}</p> : ''}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="">비밀번호</label>
              <input
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                name="password"
                value={form.password}
                onChange={onChange}
                type="password"
              />
              {errors.password ? <p className="text-sm text-red-500">{errors.password}</p> : ''}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="">비밀번호 확인</label>
              <input
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                name="confirm"
                value={form.confirm}
                onChange={onChange}
                type="password"
              />
              {errors.confirm ? <p className="text-sm text-red-500">{errors.confirm}</p> : ''}
            </div>
            <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200">
              회원 가입
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
