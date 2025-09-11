import { useEffect, useState } from 'react'

import { me } from '@/api/me.js'
import { token } from '@/api/token.js'
import InputForm from '@/components/InputForm.jsx'

export default function MyProfile() {
  const [myProfile, setMyProfile] = useState({
    id: '',
    name: '',
    email: '',
    bio: '',
    avatarUrl: '',
  })
  const [hasToken, setHasToken] = useState(Boolean(token.get()))
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '' })

  /* profile 정보 가져오기 */
  useEffect(() => {
    async function fetchMe() {
      if (!hasToken) {
        return
      }
      try {
        const res = await me.get()

        setMyProfile({
          id: res?.data.id || '',
          name: res?.data.name || '',
          email: res?.data.email || '',
          bio: res?.data.bio || '',
          avatarUrl: res?.data.avatarUrl || '',
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchMe()
  }, [hasToken])

  /* Profile 업데이트 */
  const handleProfile = async () => {
    await me
      .patchMe(myProfile)
      .then((res) => {
        alert('프로필이 변경되었습니다.')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  /* 비밀번호 업데이트 */
  const handlePassword = async () => {
    await me
      .changePassword(pw)
      .then((res) => {
        alert('비밀번호가 변경되었습니다.')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">정보 변경</h1>
        </header>

        {/* 프로필 변경 Section */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">내 정보</h2>
          <div>
            <InputForm
              name="name"
              value={myProfile.name}
              text="이름"
              onChange={(e) => setMyProfile((p) => ({ ...p, name: e.target.value }))}
              className="h-11 w-full rounded-sm"
            />
          </div>
          <div className="mt-3">
            <InputForm
              name="email"
              value={myProfile.email}
              text="이메일"
              onChange={(e) => setMyProfile((p) => ({ ...p, email: e.target.value }))}
              className="h-11 w-full rounded-sm"
            />
          </div>
          <div className="mt-3">
            <InputForm
              name="url"
              value={myProfile.avatarUrl}
              text="프로필 이미지 URL"
              onChange={(e) => setMyProfile((p) => ({ ...p, avatarUrl: e.target.value }))}
              className="h-11 w-full rounded-sm"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="">설명</label>
            <textarea
              name="url"
              value={myProfile.bio}
              onChange={(e) => setMyProfile((p) => ({ ...p, bio: e.target.value }))}
              className="w-full mt-1 min-h-30 border border-gray-300 rounded-sm px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleProfile}
              className="h-11 rounded-xl bg-slate-900 px-4 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              저장
            </button>
          </div>
        </section>

        {/* 비밀번호 변경 Section */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">비밀번호 변경</h2>

          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm">
              현재 비밀번호
              <input
                type="password"
                value={pw.currentPassword}
                onChange={(e) => setPw((p) => ({ ...p, currentPassword: e.target.value }))}
                className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400"
              />
            </label>
            <label className="grid gap-2 text-sm">
              새 비밀번호
              <input
                type="password"
                value={pw.newPassword}
                onChange={(e) => setPw((p) => ({ ...p, newPassword: e.target.value }))}
                className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400"
              />
            </label>
          </div>

          <button
            onClick={handlePassword}
            className="h-11 rounded-xl bg-slate-900 px-4 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            비밀번호 변경
          </button>
        </section>
      </div>
    </div>
  )
}
