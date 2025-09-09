import { Clock, Target } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { quizApi } from '@/api/quiz.js'

const QuizResultCard = () => {
  const [result, setResult] = useState(null)

  const { sessionId } = useParams()
  useEffect(() => {
    quizApi.getResult(sessionId).then((res) => {
      setResult(res.data)
    })
  }, [sessionId])

  /* 퀴즈 풀이 결과 */
  return (
    <>
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
      {result?.correct === result?.attempts.length ? (
        <p className="mt-3 font-bold text-xl">100점! 축하드립니다! 🥳</p>
      ) : (
        <p className="mt-3 font-bold text-xl">다시 도전해보세요! 📚</p>
      )}
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
    </>
  )
}

export default QuizResultCard
