import { X } from 'lucide-react'
import { useState } from 'react'

import { categoryApi } from '@/api/category.js'

export default function CategoryModal({ setShow }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleCategory = async () => {
    await categoryApi
      .create({
        name,
        description,
      })
      .then(() => {
        alert('카테고리가 추가되었습니다.')
        setShow(false)
        setName('')
        setDescription('')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  /* 카테고리 생성 */
  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  bg-white p-6 rounded-xl shadow-lg z-40 w-11/12 max-w-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">카테고리 추가</h3>
        <button className="text-xl" onClick={() => setShow(false)}>
          <X className="cursor-pointer" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">카테고리 이름</label>
          <input
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="카테고리 이름을 적어주세요."
            type="text"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">카테고리 설명</label>
          <textarea
            placeholder="카테고리 설명을 적어주세요."
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      <button
        onClick={handleCategory}
        className="w-full py-3 mt-7 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
      >
        생성
      </button>
    </div>
  )
}
