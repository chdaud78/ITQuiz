import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { categoryApi } from '@/api/category.js'
import { quizApi } from '@/api/quiz.js'

const QuizModify = ({ quiz, setShowModify, onUpdated }) => {
  const [categories, setCategory] = useState([])
  const [form, setForm] = useState({
    context: '',
    category: [],
    type: '',
    options: Array(5).fill({ text: '', isCorrect: false }),
    answer: '',
    maxScore: 10,
  })

  /* 카테고리 가져오기 */
  useEffect(() => {
    categoryApi
      .get()
      .then((res) => {
        setCategory(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
    setForm(quiz)
  }, [quiz])

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  /* 객관식 옵션 함수 */
  const onChangeOptionText = (index, value) => {
    setForm((f) => {
      const newOptions = [...f.options]
      newOptions[index] = { ...newOptions[index], text: value }
      return { ...f, options: newOptions }
    })
    console.log(form)
  }

  /* 객관식 정답 함수 */
  const onChangeOptionCorrect = (index, checked) => {
    setForm((f) => {
      const newOptions = [...f.options]
      newOptions[index] = { ...newOptions[index], isCorrect: checked }
      return { ...f, options: newOptions }
    })
  }

  /* 퀴즈 수정 */
  const handleQuiz = async (e) => {
    e.preventDefault()
    try {
      const res = await quizApi.update(quiz._id, form)
      alert('퀴즈가 수정되었습니다.')
      setShowModify(false)
      onUpdated && onUpdated(res.data)
    } catch (error) {
      console.error(error)
      alert('수정 중 오류가 발생했습니다.')
    }
  }

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  bg-white p-6 rounded-xl shadow-lg z-40 w-11/12 max-w-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">퀴즈 추가</h3>
        <button className="text-xl" onClick={() => setShowModify(false)}>
          <X className="cursor-pointer" />
        </button>
      </div>
      <div>
        <form className="space-y-6" onSubmit={handleQuiz}>
          <div>
            <label className="block font-medium mb-1">퀴즈 내용</label>
            <textarea
              name="context"
              value={form?.context}
              onChange={onChange}
              placeholder="퀴즈를 적어주세요."
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            {/* 카테고리 선택 */}
            <label className="block font-medium mb-1">퀴즈 카테고리</label>
            <select
              name="category"
              value={form?.category._id}
              className="w-full border border-gray-300 rounded-md p-2"
              onChange={onChange}
            >
              <option value="">카테고리를 선택해 주세요.</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            {/* 주관식, 객관식 종류 선택 */}
            <label className="block font-medium mb-1">퀴즈 종류</label>
            <select
              name="type"
              value={form?.type}
              className="w-full border border-gray-300 rounded-md p-2"
              onChange={onChange}
            >
              <option value="">퀴즈 종류를 선택 해주세요.</option>
              <option value="multiple">객관식</option>
              <option value="subjective">주관식</option>
            </select>
          </div>
          {/* 객관식 */}
          {form.type === 'multiple' && (
            <div>
              <label className="block font-medium mb-1">퀴즈 객관식 문제 구성</label>
              <div className="space-y-2">
                {form.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      value={opt.text}
                      onChange={(e) => onChangeOptionText(idx, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-md p-2"
                      placeholder={`선택지 ${idx + 1}`}
                      type="text"
                    />
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        checked={opt.isCorrect}
                        onChange={(e) => onChangeOptionCorrect(idx, e.target.checked)}
                      />
                      정답
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* 주관식 */}
          {form.type === 'subjective' && (
            <div>
              <label className="block font-medium mb-1">퀴즈 주관식 문제 구성</label>
              <input
                name="answer"
                value={form?.answer}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="주관식 정답 키워드로 적어주세요."
              />
            </div>
          )}
          <div>
            <label className="block font-medium mb-1">퀴즈 점수 구성</label>
            <input
              name="maxScore"
              value={form?.maxScore}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="점수를 적어주세요."
              type="number"
            />
          </div>
          <button className="w-full py-3 mt-7 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200">
            수정
          </button>
        </form>
      </div>
    </div>
  )
}

export default QuizModify
