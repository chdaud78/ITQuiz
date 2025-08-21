import { Trophy, History, Brain } from 'lucide-react'

export default function Home() {
  return (
    /* 통계 */
    <div className="px-10 md:px-20 lg:px-30">
      <div className=" mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="p-5 bg-gray-100 flex flex-col justify-center items-center rounded-sm">
          <Trophy className="text-blue-500" />
          <p className="text-blue-500 text-xl text-lg font-bold mt-3">0</p>
          <p className="text-gray-400 mt-1">총 점수</p>
        </div>
        <div className="p-5 bg-gray-100 flex flex-col justify-center items-center rounded-sm">
          <History className="text-blue-500" />
          <p className="text-blue-500 text-xl font-bold mt-3">0</p>
          <p className="text-gray-400 mt-1">총 점수</p>
        </div>
        <div className="p-5 bg-gray-100 flex flex-col justify-center items-center rounded-sm">
          <Brain className="text-blue-500" />
          <p className="text-blue-500 text-xl font-bold mt-3">0</p>
          <p className="text-gray-400 mt-1">총 점수</p>
        </div>
      </div>
      {/* 퀴즈 카테고리 */}
      <div className="mt-10 md:mt-20 lg:mt-30">
        <h2 className="font-bold text-xl text-center">카테고리를 선택하세요</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
          <div className="bg-red-200 p-5 border-1 border-red-500 rounded-sm">
            <div className="flex justify-between items-start">
              <div className="rounded-sm p-3 bg-white">
                <Brain className="text-red-200" />
              </div>
              <span className="text-sm text-gray-300 bg-white block px-3 py-1 rounded-xl">
                5문제
              </span>
            </div>
            <h3 className="font-bold mt-5">운영체제</h3>
            <p className="text-gray-500 mt-3">운영체제</p>
            <button className="w-full bg-white p-3 rounded-sm mt-5 cursor-pointer">시작하기</button>
          </div>
          <div className="bg-lime-200 p-5 border-1 border-lime-500 rounded-sm ">
            <div className="flex justify-between items-start">
              <div className="rounded-sm p-3 bg-white">
                <Brain className="text-lime-200" />
              </div>
              <span className="text-sm text-gray-300 bg-white block px-3 py-1 rounded-xl">
                5문제
              </span>
            </div>
            <h3 className="font-bold mt-5">운영체제</h3>
            <p className="text-gray-500 mt-3">운영체제</p>
            <button className="w-full bg-white p-3 rounded-sm mt-5  cursor-pointer">
              시작하기
            </button>
          </div>
          <div className="bg-emerald-200 p-5 border-1 border-emerald-500 rounded-sm ">
            <div className="flex justify-between items-start">
              <div className="rounded-sm p-3 bg-white">
                <Brain className="text-emerald-200" />
              </div>
              <span className="text-sm text-gray-300 bg-white block px-3 py-1 rounded-xl">
                5문제
              </span>
            </div>
            <h3 className="font-bold mt-5">운영체제</h3>
            <p className="text-gray-500 mt-3">운영체제</p>
            <button className="w-full bg-white p-3 rounded-sm mt-5  cursor-pointer">
              시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
