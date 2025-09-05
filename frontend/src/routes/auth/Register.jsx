import { useState } from 'react'
import { useNavigate } from 'react-router'

import { auth } from '@/api/auth.js'
import InputForm from '@/components/InputForm.jsx'
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
              <InputForm
                text="이름"
                name="name"
                value={form.name}
                onChange={onChange}
                type="text"
                error={errors.name}
              />
            </div>
            <div className="flex flex-col mb-4">
              <InputForm
                text="이메일"
                name="email"
                value={form.email}
                onChange={onChange}
                type="text"
                error={errors.email}
              />
            </div>
            <div className="flex flex-col mb-4">
              <InputForm
                text="비밀번호"
                name="password"
                value={form.password}
                onChange={onChange}
                type="password"
                error={errors.password}
              />
            </div>
            <div className="flex flex-col mb-4">
              <InputForm
                text="비밀번호 확인"
                name="confirm"
                value={form.confirm}
                onChange={onChange}
                type="password"
                error={errors.confirm}
              />
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
