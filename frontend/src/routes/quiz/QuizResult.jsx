import { Trophy, Target, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { quizApi } from '@/api/quiz.js'
import { ROUTES } from '@/lib/routes.js'

export default function QuizResult() {
  const [result, setResult] = useState(null)

  const { sessionId } = useParams()
  useEffect(() => {
    quizApi.getResult(sessionId).then((res) => {
      setResult(res.data)
      console.log(res.data)
    })
  }, [sessionId])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="p-10 flex flex-col justify-center items-center border-1 rounded-sm">
        <div className="bg-blue-500 p-3 rounded-full">
          <Trophy className="text-white text-xl" />
        </div>
        <h2 className="mt-5 font-bold text-xl">퀴즈 완료</h2>
        <p className="mt-5 font-bold text-xl text-blue-500">
          {result?.correct}/{result?.attempts.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full w-0"
            style={{ width: `${(result?.correct / result?.attempts.length) * 100}%` }}
          />
        </div>
        <p className="mt-3 font-bold text-xl">다시 도전해보세요! 📚</p>
        <div className="w-full flex justify-around mt-10">
          <div className="flex flex-col justify-center items-center">
            <Target className="text-blue-500" />
            <p className="mt-2 text-blue-500 font-bold text-xl text-center">
              {Math.round((result?.correct / result?.attempts.length) * 100)}%
            </p>
            <p className="mt-1 text-gray-500 text-center">정답률</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Clock className="text-blue-500" />
            <p className="mt-2 text-blue-500 font-bold text-xl text-center">
              {Math.floor(result?.totalTime / 60)}:
              {(result?.totalTime % 60).toString().padStart(2, '0')}
            </p>
            <p className="mt-1 text-gray-500 text-center">소요시간</p>
          </div>
        </div>
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
