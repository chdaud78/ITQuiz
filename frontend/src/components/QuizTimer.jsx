import { Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function QuizTimer({ onTimeUpdate }) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        const newSeconds = prev + 1
        onTimeUpdate?.(newSeconds)
        return newSeconds
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onTimeUpdate])

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0')
    const s = (sec % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="ml-5 flex items-center">
      <Clock className="text-blue-500" />
      <p className="text-blue-500 ml-2">{formatTime(seconds)}</p>
    </div>
  )
}
