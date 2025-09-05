import { Trophy } from 'lucide-react'
import { Link } from 'react-router'

import QuizResultCard from '@/components/quiz/QuizResultCard.jsx'
import { ROUTES } from '@/lib/routes.js'

export default function QuizResult() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="p-10 flex flex-col justify-center items-center border-1 rounded-sm">
        {/* 아이콘 */}
        <div className="bg-blue-500 p-3 rounded-full">
          <Trophy className="text-white text-xl" />
        </div>
        {/* 퀴즈 결과 정보 */}
        <QuizResultCard />
        {/* 홈으로 가기 버튼 */}
        <div className="mt-10 w-full">
          <Link
            to={ROUTES.HOME}
            className="block w-full text-center border-1 py-3 mt-2 rounded-sm cursor-pointer  transition  hover:bg-gray-500"
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  )
}
