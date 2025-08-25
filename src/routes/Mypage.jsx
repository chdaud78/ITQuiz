import StatusCard from "@/components/StatusCard.jsx";
import {Trophy, History, Brain, Calendar} from "lucide-react"
import HistoryCard from "@/components/HistoryCard.jsx";
import CategoryStatusCard from "@/components/CategoryStatusCard.jsx";
import {useState} from "react";

export default function Mypage() {
  const [menuStatus, setMenuStatus] = useState("history")

  const onClickMenu = (menu) => {
    setMenuStatus(menu)
  }

  return (
    <div className="px-10 md:px-20 lg:px-30">
      {/* 이름 */}
      <div className="border-1 p-5 flex items-center">
        <div className="border-1 rounded-full p-5 mr-5">
          <img className="w-full" src="./vite.svg" alt="프로필 이미지"/>
        </div>
        <div>
        <p className="font-bold text-xl">박총명</p>
        <p className="text-sm text-gray-500 mt-2">qkrri56@naver.com</p>
        <p className="text-sm text-gray-500 mt-1">가입일 : 2024.01.15</p>
        </div>
      </div>
      {/* 전체 통계 */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatusCard icon={Trophy} value="0" text="총 점수" />
        <StatusCard icon={History} value="0" text="완료한 퀴즈" />
        <StatusCard icon={Brain} value="0" text="평균 정답률" />
        <StatusCard icon={Calendar} value="0" text="연속 일수" />
      </div>
      {/* 메뉴 */}
        <ul className="bg-gray-100 rounded-sm mt-10 grid grid-cols-2 items-center px-2 py-1">
          <li className={`text-center rounded-sm cursor-pointer ${menuStatus === 'history' ? 'bg-white font-bold': ""}`} onClick={() => onClickMenu('history')}>최근 활동</li>
          <li className={`text-center rounded-sm cursor-pointer ${menuStatus === 'category' ? 'bg-white font-bold': ""}`} onClick={() => onClickMenu('category')}>카테고리 통계</li>
        </ul>
      {/* 카테고리 별 통계 */}
      <div>
        {menuStatus === "history" && <HistoryCard />}
        {menuStatus === "category" && <CategoryStatusCard />}
      </div>
    </div>
  )
}
