import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { categoryApi } from '@/api/category.js'
import { quizApi } from '@/api/quiz.js'

export default function QuizModal({ setShow }) {
  const [categories, setCategory] = useState([])
  const [form, setForm] = useState({
    context: '',
    category: '',
    type: '',
    options: Array(5).fill({ text: '', isCorrect: false }),
    answer: '',
    maxScore: 10,
  })

  useEffect(() => {
    categoryApi
      .get()
      .then((res) => {
        setCategory(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onChangeOptionText = (index, value) => {
    setForm((f) => {
      const newOptions = [...f.options]
      newOptions[index] = { ...newOptions[index], text: value }
      return { ...f, options: newOptions }
    })
  }

  const onChangeOptionCorrect = (index, checked) => {
    setForm((f) => {
      const newOptions = [...f.options]
      newOptions[index] = { ...newOptions[index], isCorrect: checked }
      return { ...f, options: newOptions }
    })
  }

  const handleQuiz = (e) => {
    e.preventDefault()

    const payload = {
      context: form.context,
      category: form.category,
      type: form.type,
      answer: form.answer, // 주관식일 때만 사용
      maxScore: Number(form.maxScore) || 10,
      options: form.options.filter((o) => o.text.trim() !== ''),
    }

    quizApi
      .create(payload)
      .then(() => {
        alert('퀴즈가 추가되었습니다.')
        setShow(false)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  bg-white p-6 rounded-xl shadow-lg z-40 w-11/12 max-w-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">퀴즈 추가</h3>
        <button className="text-xl" onClick={() => setShow(false)}>
          <X className="cursor-pointer" />
        </button>
      </div>
      <div>
        <form className="space-y-6" onSubmit={handleQuiz}>
          <div>
            <label className="block font-medium mb-1">퀴즈 내용</label>
            <textarea
              name="context"
              onChange={onChange}
              placeholder="퀴즈를 적어주세요."
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">퀴즈 카테고리</label>
            <select
              name="category"
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
            <label className="block font-medium mb-1">퀴즈 종류</label>
            <select
              name="type"
              className="w-full border border-gray-300 rounded-md p-2"
              onChange={onChange}
            >
              <option value="">퀴즈 종류를 선택 해주세요.</option>
              <option value="multiple">객관식</option>
              <option value="subjective">주관식</option>
            </select>
          </div>
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
          {form.type === 'subjective' && (
            <div>
              <label className="block font-medium mb-1">퀴즈 주관식 문제 구성</label>
              <input
                name="answer"
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
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="점수를 적어주세요."
              type="number"
            />
          </div>
          <button className="w-full py-3 mt-7 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200">
            생성
          </button>
        </form>
      </div>
    </div>
  )
}
