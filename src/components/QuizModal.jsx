import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { categoryApi } from '@/api/category.js'

export default function QuizModal({ setShow }) {
  const [categories, setCategory] = useState([])

  useEffect(() => {
    categoryApi
      .get()
      .then((res) => {
        console.log(res.data)
        setCategory(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

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
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">퀴즈 내용</label>
          <textarea className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">퀴즈 카테고리</label>
          <select className="w-full border border-gray-300 rounded-md p-2">
            <option value="">카테고리를 선택해 주세요.</option>
            {categories.map((category) => (
              <option value="" key={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">퀴즈 종류</label>
          <select className="w-full border border-gray-300 rounded-md p-2">
            <option value="">퀴즈 종류를 선택 해주세요.</option>
            <option value="subjective">주관식</option>
            <option value="multiple">객관식</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">퀴즈 객관식 문제 구성</label>
          <div className="space-y-2">
            <input className="w-full border border-gray-300 rounded-md p-2" type="text" />
            <input className="w-full border border-gray-300 rounded-md p-2" type="text" />
            <input className="w-full border border-gray-300 rounded-md p-2" type="text" />
            <input className="w-full border border-gray-300 rounded-md p-2" type="text" />
            <input className="w-full border border-gray-300 rounded-md p-2" type="text" />
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">퀴즈 점수 구성</label>
          <input className="w-full border border-gray-300 rounded-md p-2" type="number" />
        </div>
      </div>
      <button className="w-full py-3 mt-7 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200">
        생성
      </button>
    </div>
  )
}
