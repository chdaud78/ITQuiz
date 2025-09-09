const QuizProgress = ({ currentIndex, total }) => {
  const percentage = Math.round(((currentIndex + 1) / total) * 100)

  /* 퀴즈 풀이 progress bar */
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">
          문제 {currentIndex + 1}/{total}
        </p>
        <p className="text-sm text-gray-500">{percentage}% 완료</p>
      </div>
      <div className="mt-2">
        <div className="w-full bg-purple-400 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  )
}

export default QuizProgress
