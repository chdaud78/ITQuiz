import { Trophy, History, Brain } from 'lucide-react'
import { useEffect, useState } from 'react'

import { categoryApi } from '@/api/category.js'
import CategoryCard from '@/components/CategoryCard.jsx'
import StatusCard from '@/components/StatusCard.jsx'

export default function Home() {
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

  return (
    /* 통계 */
    <div className="container mx-auto p-4 space-y-6">
      <div className=" mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatusCard icon={Trophy} value="5" text="총 점수" />
        <StatusCard icon={History} value="5" text="총 점수" />
        <StatusCard icon={Brain} value="5" text="총 점수" />
      </div>
      {/* 퀴즈 카테고리 */}
      <div className="mt-10 md:mt-20 lg:mt-30">
        <h2 className="font-bold text-xl text-center">카테고리를 선택하세요</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
          {categories.map((category, index) => (
            <CategoryCard category={category} key={category.name} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
