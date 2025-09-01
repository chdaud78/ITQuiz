import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { quizApi } from '@/api/quiz.js'
import QuizCard from '@/components/QuizCard.jsx'
import QuizTimer from '@/components/QuizTimer.jsx'

export default function Quiz() {
  const { sessionId } = useParams()
  const navigate = useNavigate()

  const [session, setSession] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [answers, setAnswers] = useState([])
  const [timeTaken, setTimeTaken] = useState(0)

  useEffect(() => {
    async function fetchSession() {
      const res = await quizApi.getSession(sessionId)
      setSession(res.data)
    }
    fetchSession()
  }, [sessionId])

  if (!session) {
    return <p>로딩중...</p>
  }

  const currentQuiz = session.quizzes[currentIndex]

  const handleSubmit = async (answer) => {
    const res = await quizApi.submit(sessionId, { answer, timeTaken }) // timeTaken 계산 가능
    setAnswers([
      ...answers,
      {
        quizId: currentQuiz._id,
        isCorrect: res.data.isCorrect,
        score: res.data.score,
        timeTaken: res.data.timeTaken,
      },
    ])
    setShowAnswer(true)
  }

  const nextQuiz = () => {
    if (currentIndex + 1 >= session.quizzes.length) {
      navigate(`/quiz/result/${sessionId}`)
    } else {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* 진행률 */}
      <div className="flex justify-between">
        <div className="w-full">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">
              문제 {currentIndex + 1}/{session.quizzes.length}
            </p>
            <p className="text-sm text-gray-500">
              {Math.round(((currentIndex + 1) / session.quizzes.length) * 100)}% 완료
            </p>
          </div>
          <div className="mt-2">
            <div className="w-full bg-purple-400 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${((currentIndex + 1) / session.quizzes.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
        <QuizTimer onTimeUpdate={setTimeTaken} />
      </div>
      <QuizCard
        quiz={currentQuiz}
        onSubmit={handleSubmit}
        showAnswer={showAnswer}
        nextQuiz={nextQuiz}
      />
    </div>
  )
}
