import { useState } from 'react'

export default function QuizCard({ quiz, onSubmit, showAnswer, nextQuiz }) {
  const [selected, setSelected] = useState([])
  const [textAnswer, setTextAnswer] = useState('')

  const toggleOption = (optId) => {
    const idStr = optId.toString()
    if (selected.includes(idStr)) {
      setSelected(selected.filter((id) => id !== idStr))
    } else {
      setSelected([...selected, idStr])
    }
  }

  const handleSubmit = () => {
    if (quiz.type === 'subjective') {
      if (!textAnswer.trim()) {
        return
      }
      onSubmit(textAnswer)
    } else {
      if (selected.length === 0) {
        return
      }
      onSubmit(selected.map((id) => id.toString()))
    }
  }
  const handleNext = () => {
    setSelected([])
    setTextAnswer('')
    nextQuiz()
  }

  /* 퀴즈 풀이 카드 */
  return (
    <div className="mt-5 p-5 border-1 rounded-sm">
      <h3 className="text-xl font-bold text-center">{quiz.context}</h3>
      <div className="mt-5 space-y-3">
        {/* 객관식 */}
        {quiz.type === 'multiple' &&
          quiz.options.map((opt, idx) => {
            const isSelected = selected.includes(opt._id)
            const isCorrect = showAnswer && opt.isCorrect
            const isWrong = showAnswer && isSelected && !opt.isCorrect

            return (
              <div
                key={opt._id}
                onClick={() => !showAnswer && toggleOption(opt._id)}
                className={`p-4 border rounded cursor-pointer transition
                ${isSelected ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-50'}
                ${isCorrect ? 'bg-green-100 border-green-500' : ''}
                ${isWrong ? 'bg-red-100 border-red-500' : ''}
              `}
              >
                <span className="font-bold mr-2">{idx + 1}.</span>
                {opt.text}
              </div>
            )
          })}
        {/* 주관식 */}
        {quiz.type === 'subjective' && (
          <input
            type="text"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            className="w-full p-3 border rounded-sm focus:border-blue-500"
            placeholder="정답을 입력해주세요."
          />
        )}
      </div>
      {!showAnswer && (
        <div className="mt-6">
          <button onClick={handleSubmit} className="w-full py-3 bg-blue-500 text-white rounded">
            제출
          </button>
        </div>
      )}

      {/* 정답 */}
      {showAnswer && (
        <div className="mt-4">
          {quiz.type === 'multiple' && (
            <p className="text-green-500">
              정답:{' '}
              {quiz.options
                .filter((o) => o.isCorrect)
                .map((o) => o.text)
                .join(', ')}
            </p>
          )}
          {quiz.type === 'subjective' && <p className="text-green-500">정답: {quiz.answer}</p>}
          <div className="mt-6">
            <button onClick={handleNext} className="w-full py-3 bg-blue-500 text-white rounded">
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
