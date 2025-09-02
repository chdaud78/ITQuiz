import { useEffect, useState } from 'react'

import { me } from '@/api/me.js'

export default function HistoryCard() {
  const [histories, setHistories] = useState([])

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await me.getHistory()
        setHistories(res.data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchHistory()
  }, [])

  const formatDate = (date) => {
    const d = new Date(date)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  return (
    <div className="mt-5 p-5 border-1 rounded-sm">
      <h2 className="text-xl font-bold">✏️ 최근 퀴즈 기록</h2>
      <div className="mt-5">
        {histories.map((history, idx) => (
          <div
            key={history._id}
            className={`mt-3 pb-3 flex justify-between items-center ${idx !== histories.length - 1 ? 'border-b-1' : ''}`}
          >
            <div>
              <p className="text-lg">{history.category} 퀴즈</p>
              <p className="text-sm text-gray-500">{formatDate(history.date)}</p>
            </div>
            <div>
              <p className="text-lg font-bold">
                {history.correct}/{history.total}
              </p>
              <p className="text-sm text-gray-500">{history.rate}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
