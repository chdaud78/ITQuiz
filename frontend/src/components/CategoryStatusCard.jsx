import { useEffect, useState } from 'react'

import { me } from '@/api/me.js'

export default function CategoryStatusCard() {
  const [stats, setStats] = useState([])

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await me.getCHistory()
        setStats(res.data)
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    }
    fetchStats()
  }, [])

  return (
    <div>
      {stats.map((stat) => (
        <div key={stat.category} className="p-5 mt-5 border-1 rounded-sm">
          <h2 className="font-bold text-lg">{stat.category}</h2>
          <div className="flex justify-between mt-5">
            <p className="text-gray-500">완료한 퀴즈</p>
            <p>{stat.completed}회</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-gray-500">정답률</p>
            <p>{stat.correctRate}%</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-gray-500">총 점수</p>
            <p>{stat.totalScore}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
