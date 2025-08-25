import {useState} from "react";
import {Clock} from 'lucide-react'
import QuizCard from "@/components/QuizCard.jsx";

export default function Quiz () {
  const [type, setType] = useState('select')
  return (
    <div className="px-10 md:px-20 lg:px-30">
      {/* 진행률 */}
      <div className="flex justify-between">
        <div className="w-full">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">문제 3/5</p>
          <p className="text-sm text-gray-500">60% 완료</p>
        </div>
        <div className="mt-2">
          <div className="w-full bg-purple-400 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full w-50"></div>
          </div>
        </div>
        </div>
        <div className=" ml-5 flex items-center">
          <Clock className="text-blue-500"/>
          <p className="text-blue-500 ml-2">1:23</p>
        </div>
      </div>
      <QuizCard />
    </div>
  )
}