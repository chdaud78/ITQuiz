import { useState } from 'react'

export default function QuizCard({ quiz, onSubmit, showAnswer, nextQuiz }) {
  const [selected, setSelected] = useState([])

  const toggleOption = (optId) => {
    if (selected.includes(optId)) {
      setSelected(selected.filter((id) => id !== optId))
    } else {
      setSelected([...selected, optId])
    }
  }

  const handleSubmit = () => {
    if (selected.length === 0) {
      return
    }
    onSubmit(selected.map((id) => id.toString()))
  }
  const handleNext = () => {
    setSelected([])
    nextQuiz()
  }

  return (
    <div className="mt-5 p-5 border-1 rounded-sm">
      <h3 className="text-xl font-bold text-center">{quiz.context}</h3>
      <div className="mt-5 space-y-3">
        {quiz.options.map((opt, idx) => {
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
      </div>
      {!showAnswer && (
        <div className="mt-6">
          <button onClick={handleSubmit} className="w-full py-3 bg-blue-500 text-white rounded">
            제출
          </button>
        </div>
      )}

      {showAnswer && (
        <div>
          <p className="mt-4 text-green-600">
            정답:{' '}
            {quiz.options
              .filter((o) => o.isCorrect)
              .map((o) => o.text)
              .join(', ')}
          </p>
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
