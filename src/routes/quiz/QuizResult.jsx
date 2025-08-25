import {Trophy, Target, Clock} from 'lucide-react'

export default function QuizResult () {
  return(
    <div className="mt-20 px-10 md:px-20 lg:px-30">
      <div className="p-10 flex flex-col justify-center items-center border-1 rounded-sm">
      <div className="bg-blue-500 p-3 rounded-full">
        <Trophy className="text-white text-xl" />
      </div>
      <h2 className="mt-5 font-bold text-xl">퀴즈 완료</h2>
      <p className="mt-2 text-sm text-gray-500">과학</p>
      <p className="mt-5 font-bold text-xl text-blue-500">0/5</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div className="bg-blue-600 h-2.5 rounded-full w-0"></div>
      </div>
      <p className="mt-3 font-bold text-xl">다시 도전해보세요! 📚</p>
      <div className="w-full flex justify-around mt-10">
        <div className="flex flex-col justify-center items-center">
          <Target className="text-blue-500"/>
          <p className="mt-2 text-blue-500 font-bold text-xl text-center">0%</p>
          <p className="mt-1 text-gray-500 text-center">정답률</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Clock className="text-blue-500"/>
          <p className="mt-2 text-blue-500 font-bold text-xl text-center">5:00</p>
          <p className="mt-1 text-gray-500 text-center">소요시간</p>
        </div>
      </div>
        <div className="mt-10 w-full">
      <button className="block w-full text-center py-3 bg-sky-500 rounded-sm text-white cursor-pointer transition hover:bg-blue-500">다시도전</button>
      <button className="block w-full text-center border-1 py-3 mt-2 rounded-sm cursor-pointer  transition  hover:bg-gray-500">홈으로</button>
        </div>
      </div>
    </div>
  )
}