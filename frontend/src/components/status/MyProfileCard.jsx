import { useEffect, useState } from 'react'

import { me } from '@/api/me.js'

const MyProfileCard = ({ hasToken }) => {
  const [myProfile, setMyProfile] = useState({ id: '', name: '', email: '', createdAt: '' })

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
          createdAt: res?.data.createdAt || '',
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchMe()
  }, [hasToken])

  const formatDate = (date) => {
    const d = new Date(date)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  return (
    <div className="border-1 p-5 flex items-center">
      <div className="border-1 rounded-full p-5 mr-5">
        <img className="w-full" src="./vite.svg" alt="프로필 이미지" />
      </div>
      <div>
        <p className="font-bold text-xl">{myProfile.name}</p>
        <p className="text-sm text-gray-500 mt-2">{myProfile.email}</p>
        <p className="text-sm text-gray-500 mt-1">가입일 : {formatDate(myProfile.createdAt)}</p>
      </div>
    </div>
  )
}

export default MyProfileCard
