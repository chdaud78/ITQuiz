import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { categoryApi } from '@/api/category.js'

const CategoryModify = ({ setShow, data, onUpdated }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  // 기존 값 가져오기
  useEffect(() => {
    setName(data?.name ?? '')
    setDescription(data?.description ?? '')
  }, [data])

  // category update
  const handleCategory = async () => {
    if (!data?._id) {
      alert('잘못된 카테고리입니다.')
      return
    }
    try {
      const res = await categoryApi.put(data._id, {
        name,
        description,
      })
      const updated = res.data
      onUpdated?.(updated)
      alert('카테고리가 수정되었습니다.')
      setShow(false)
      setName('')
      setDescription('')
    } catch (e) {
      console.error(e)
      alert(e.response?.data?.error || '수정 중 오류가 발생했습니다.')
    }
  }

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  bg-white p-6 rounded-xl shadow-lg z-40 w-11/12 max-w-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">카테고리 수정</h3>
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
            value={name}
            type="text"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">카테고리 설명</label>
          <textarea
            placeholder="카테고리 설명을 적어주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      <button
        onClick={handleCategory}
        className="w-full py-3 mt-7 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
      >
        수정
      </button>
    </div>
  )
}

export default CategoryModify
