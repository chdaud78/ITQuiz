import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { quizApi } from '@/api/quiz.js'
import QuizCard from '@/components/quiz/QuizCard.jsx'
import QuizProgress from '@/components/quiz/QuizProgress.jsx'
import QuizTimer from '@/components/QuizTimer.jsx'

export default function Quiz() {
  // navigate
  const navigate = useNavigate()
  // session
  const { sessionId } = useParams()
  const [session, setSession] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  // answer
  const [showAnswer, setShowAnswer] = useState(false)
  const [answers, setAnswers] = useState([])
  // time
  const [timeTaken, setTimeTaken] = useState(0)

  /* Session 가져오기 */
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

  /* 정답 제출 */
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

  /* 다음 퀴즈로 넘어가기 */
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
        <QuizProgress currentIndex={currentIndex} total={session.quizzes.length} />
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
