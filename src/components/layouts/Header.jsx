import { Link } from 'react-router'

import { ROUTES } from '@/lib/routes.js'

export default function Header() {
  return (
    <header className="w-full bg-gray-800 text-white h-16 flex items-center justify-between px-6 shadow-md">
      <div className="w-full flex justify-between items-end">
        <h2>
          <Link to={ROUTES.HOME}>ITQuiz</Link>
        </h2>
        <ul className="flex justify-cneter gap-3">
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
            <Link to={ROUTES.AUTH.LOGIN} className="text-sm">
              로그인
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
