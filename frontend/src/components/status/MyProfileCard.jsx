import { UserRoundCog } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { me } from '@/api/me.js'

const MyProfileCard = ({ hasToken }) => {
  const [myProfile, setMyProfile] = useState({
    id: '',
    name: '',
    email: '',
    createdAt: '',
    bio: '',
    avatarUrl: '',
  })

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

  /* 프로필 카드 */
  return (
    <div className="border-1 p-5 flex justify-between">
      <div className="flex items-center items-center">
        <div className="mr-5">
          <img
            className="w-30 rounded-full block border-1 "
            src={myProfile.avatarUrl ? myProfile.avatarUrl : './profile.jpg'}
            alt="프로필 이미지"
          />
        </div>
        <div>
          <p className="font-bold text-xl">{myProfile.name}</p>
          <p className="text-sm text-gray-500 mt-2">{myProfile.email}</p>
          {myProfile.bio ? <p className="text-sm mt-1 block">{myProfile.bio}</p> : ''}
          <p className="text-sm text-gray-500 mt-1">가입일 : {formatDate(myProfile.createdAt)}</p>
        </div>
      </div>
      <div>
        <Link to="/myprofile">
          <UserRoundCog className="cursor-pointer text-gray-500" />
        </Link>
      </div>
    </div>
  )
}

export default MyProfileCard
