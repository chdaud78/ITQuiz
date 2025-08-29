import { Link, useNavigate } from 'react-router-dom'

import { auth } from '@/api/auth.js'
import { token } from '@/api/token.js'
import { ROUTES } from '@/lib/routes.js'

export default function Header() {
  const authToken = token.get()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await auth.logout()
    navigate(ROUTES.AUTH.LOGIN)
  }

  return (
    <header className="w-full bg-gray-800 text-white h-16 flex items-center justify-between px-6 shadow-md">
      <div className="w-full flex justify-between items-end">
        <h2>
          <Link to={ROUTES.HOME}>ITQuiz</Link>
        </h2>
        <ul className="flex justify-center gap-3">
          {authToken ? (
            <>
              <li>
                <Link className="text-sm" to={ROUTES.HOME}>
                  홈
                </Link>
              </li>
              <li>
                <Link to={ROUTES.AUTH.MYPAGE} className="text-sm">
                  마이페이지
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-sm cursor-pointer">
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to={ROUTES.AUTH.LOGIN} className="text-sm">
                로그인
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}
