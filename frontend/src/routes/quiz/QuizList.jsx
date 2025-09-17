import { useEffect, useState } from 'react'
import { quizApi } from '@/api/quiz.js'
import QuizModify from '@/components/quiz/QuizModify.jsx'
import { categoryApi } from '@/api/category.js'

const QuizList = () => {
  const [quizList, setQuizList] = useState([])
  const [quiz, setQuiz] = useState({})
  const [showModify, setShowModify] = useState(false)

  // 검색 & 필터 상태
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [category, setCategory] = useState([])

  useEffect(() => {
    quizApi
      .getList({ q: search, category: categoryFilter })
      .then((res) => setQuizList(res.data))
      .catch((e) => console.error(e))

    categoryApi
      .get()
      .then((res) => {
        setCategory(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [search, categoryFilter])

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    try {
      await quizApi.delete(id)
      setQuizList((prev) => prev.filter((q) => q._id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  const handleEdit = (quiz) => {
    setQuiz(quiz)
    setShowModify(true)
  }

  return (
    <div className="p-6 grid gap-3">
      {/* 검색 / 필터 UI */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="퀴즈 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md flex-1"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">전체</option>
          {category.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      {quizList.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 flex flex-col items-center justify-center min-h-[200px]">
          <p className="text-lg font-semibold">퀴즈가 존재하지 않습니다.</p>
          <p className="text-sm text-gray-400 mt-1">새로운 퀴즈를 추가해보세요!</p>
        </div>
      )}
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
      {/*<TODO> 수정 후 즉시 업데이트 필요*/}
      {showModify && (
        <QuizModify
          quiz={quiz}
          categories={category}
          setShowModify={setShowModify}
          onUpdated={(updatedQuiz) => {
            setQuizList((prev) => prev.map((q) => (q._id === updatedQuiz._id ? updatedQuiz : q)))
          }}
        />
      )}
    </div>
  )
}

export default QuizList
