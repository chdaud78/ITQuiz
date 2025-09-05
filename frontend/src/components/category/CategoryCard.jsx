import { Brain, History, Trophy, Activity, Book, Library, Star, Files, Laptop } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { categoryApi } from '@/api/category.js'

export default function CategoryCard() {
  const navigate = useNavigate()

  /* 아이콘 및 배경 기초 초기화 */
  const icons = [Brain, History, Trophy, Activity, Book, Library, Star, Files, Laptop]
  const bgColors = [
    'bg-red-200',
    'bg-blue-200',
    'bg-violet-200',
    'bg-lime-200',
    'bg-cyan-200',
    'bg-sky-200',
    'bg-fuchsia-200',
    'bg-gray-200',
    'bg-green-200',
    'bg-stone-200',
    'bg-emerald-200',
    'bg-indigo-200',
    'bg-amber-200',
    'bg-emerald-200',
    'bg-orange-200',
  ]
  const brColors = [
    'border-red-500',
    'border-blue-500',
    'border-violet-500',
    'border-lime-500',
    'border-cyan-500',
    'border-sky-500',
    'border-fuchsia-500',
    'border-gray-500',
    'border-green-500',
    'border-stone-500',
    'border-emerald-500',
    'border-indigo-500',
    'border-amber-500',
    'border-emerald-500',
    'border-orange-500',
  ]

  /* 카테고리 가져오기 */
  const [categories, setCategory] = useState([])

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

  /* 시작하기 버튼 이벤트 */
  const quizStart = async () => {
    try {
      const res = await categoryApi.startSession({ categoryId: category._id })
      const sessionId = res.data._id
      if (!sessionId || !res.data.quizIds || res.data.quizIds.length === 0) {
        alert('퀴즈가 존재하지 않습니다.')
        return
      }
      navigate(`/quiz/${sessionId}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
      {categories.map((category, index) => {
        // IconComponent
        const IconComponent = icons[index % icons.length]

        return (
          <div
            className={`p-5 border rounded-sm ${bgColors[index]} ${brColors[index]}`}
            key={category.name}
          >
            <div className="flex justify-between items-start">
              <div className="rounded-sm p-3 bg-white">
                <IconComponent className="text-red-200 w-6 h-6" />
              </div>
              <span className="text-sm text-gray-300 bg-white block px-3 py-1 rounded-xl">
                총 {category.quizCount}문제
              </span>
            </div>

            <h3 className="font-bold mt-5">{category.name}</h3>
            <p className="flex-1 text-gray-500 mt-3 line-clamp-3 min-h-[4.5rem]">
              {category.description}
            </p>

            <button
              onClick={quizStart}
              className="w-full bg-white p-3 rounded-sm mt-5 cursor-pointer"
            >
              시작하기
            </button>
          </div>
        )
      })}
    </div>
  )
}
