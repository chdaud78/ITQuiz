import { useEffect, useState } from 'react'
import { quizApi } from '@/api/quiz.js'

const QuizList = () => {
  const [quizList, setQuizList] = useState([])

  useEffect(() => {
    quizApi
      .getList()
      .then((res) => setQuizList(res.data))
      .catch((e) => console.error(e))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    try {
      await quizApi.delete(id)
      setQuizList((prev) => prev.filter((q) => q._id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  const handleEdit = (quiz) => {}

  return (
    <div className="p-6 grid gap-3">
      {quizList.map((quiz) => (
        <div
          key={quiz._id}
          className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition relative"
        >
          {/* 문제 본문 */}
          <div className="mb-3">
            <p className="text-lg font-semibold text-gray-800">{quiz.context}</p>
            <p className="text-sm text-gray-500 mt-1">
              카테고리: {typeof quiz.category === 'object' ? quiz.category?.name : quiz.category}
            </p>
          </div>

          {/* 보기 / 답안 */}
          <div className="mb-3">
            {quiz.type === 'multiple' ? (
              <div className="space-y-2">
                {quiz?.options?.map((option) => (
                  <div key={option._id || option.text} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      readOnly
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                    <p className="text-gray-700">{option.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-green-600 font-medium">정답: {quiz.answer}</p>
            )}
          </div>

          {/* 메타 정보 */}
          <div className="flex justify-between text-sm text-gray-500">
            <span>점수: {quiz.maxScore}</span>
            <span>{new Date(quiz.createdAt).toLocaleDateString('ko-KR')}</span>
          </div>

          {/* 메뉴 버튼 */}
          <div className="flex space-x-2 justify-end mt-3">
            <button
              onClick={() => handleEdit(quiz)}
              className="px-2 py-1 text-xs bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
            >
              수정
            </button>
            <button
              onClick={() => handleDelete(quiz._id)}
              className="px-2 py-1 text-xs bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuizList
