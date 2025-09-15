import {
  Brain,
  History,
  Trophy,
  Activity,
  Menu,
  Book,
  Library,
  Star,
  Files,
  Laptop,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { categoryApi } from '@/api/category.js'
import CategoryModify from '@/components/category/CategoryModify.jsx'

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

  /* 카테고리 상호작용 */
  // 메뉴 클릭
  const [showMenu, setShowMenu] = useState('')
  const onClickMenu = (id) => {
    setShowMenu(showMenu === id ? null : id)
  }

  // 수정 클릭
  const [showModify, setShowModify] = useState(false)
  const [data, setData] = useState(null)
  const onClickModify = (item) => {
    setShowModify(!showModify)
    setData(item)
    setShowMenu(null)
  }

  // 수정 완료 후 카테고리 목록 업데이트
  const handleUpdateCategory = (updated) => {
    setCategory((prev) => prev.map((c) => (c._id === updated._id ? updated : c)))
  }

  // 삭제
  const deleteCategory = (id) => {
    categoryApi
      .delete(id)
      .then((res) => {
        if (res.status === 200) {
          alert('삭제 되었습니다.')
          setCategory((prev) => prev.filter((c) => c._id !== id))
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
      {categories.map((category, index) => {
        // IconComponent
        const IconComponent = icons[index % icons.length]
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

        /* 카테고리 카드 */
        return (
          <div
            className={`p-5 border rounded-sm ${bgColors[index]} ${brColors[index]}`}
            key={category.name}
          >
            <div className="flex justify-between items-start">
              <div className="rounded-sm p-3 bg-white">
                <IconComponent className="text-red-200 w-6 h-6" />
              </div>
              <div
                onClick={() => onClickMenu(category._id)}
                className="relative flex cursor-pointer gap-3 justify-center items-center text-sm text-gray-300 bg-white block px-3 py-1 rounded-xl"
              >
                <p>총 {category.quizCount}문제</p>
                <Menu />
                {showMenu === category._id ? (
                  <div className="absolute -bottom-20 bg-white p-3 rounded-lg right-0">
                    <ul>
                      <li
                        onClick={() => onClickModify(category)}
                        className="hover:bg-gray-300 hover:text-white"
                      >
                        수정하기
                      </li>
                      <li
                        onClick={() => deleteCategory(category._id)}
                        className="mt-3 hover:bg-gray-300 hover:text-white"
                      >
                        삭제하기
                      </li>
                    </ul>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>

            <h3 className="font-bold mt-5 line-clamp-1">{category.name}</h3>
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
      {/* 카테고리 수정 Modal */}
      {showModify && (
        <CategoryModify setShow={setShowModify} data={data} onUpdated={handleUpdateCategory} />
      )}
    </div>
  )
}
