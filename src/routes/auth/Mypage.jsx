import { Trophy, History, Brain, Calendar } from 'lucide-react'
import { useState } from 'react'

import CategoryModal from '@/components/CategoryModal.jsx'
import CategoryStatusCard from '@/components/CategoryStatusCard.jsx'
import HistoryCard from '@/components/HistoryCard.jsx'
import QuizModal from '@/components/QuizModal.jsx'
import StatusCard from '@/components/StatusCard.jsx'

export default function Mypage() {
  const [menuStatus, setMenuStatus] = useState('history')
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showQuizModal, setShowQuizModal] = useState(false)

  const onClickMenu = (menu) => {
    setMenuStatus(menu)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* 문제 및 카테고리 추가 */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowCategoryModal(true)}
          className="border-1 border-green-500 px-3 py-1 rounded-sm bg-green-300 text-sm cursor-pointer"
        >
          카테고리 추가
        </button>
        <button
          onClick={() => setShowQuizModal(true)}
          className="border-1 border-sky-500 px-3 py-1 rounded-sm bg-sky-300 text-sm cursor-pointer"
        >
          문제 추가
        </button>
      </div>
      {/* 이름 */}
      <div className="border-1 p-5 flex items-center">
        <div className="border-1 rounded-full p-5 mr-5">
          <img className="w-full" src="./vite.svg" alt="프로필 이미지" />
        </div>
        <div>
          <p className="font-bold text-xl">박총명</p>
          <p className="text-sm text-gray-500 mt-2">qkrri56@naver.com</p>
          <p className="text-sm text-gray-500 mt-1">가입일 : 2024.01.15</p>
        </div>
      </div>
      {/* 전체 통계 */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatusCard icon={Trophy} value="0" text="총 점수" />
        <StatusCard icon={History} value="0" text="완료한 퀴즈" />
        <StatusCard icon={Brain} value="0" text="평균 정답률" />
        <StatusCard icon={Calendar} value="0" text="연속 일수" />
      </div>
      {/* 메뉴 */}
      <ul className="bg-gray-100 rounded-sm mt-10 grid grid-cols-2 items-center px-2 py-1">
        <li
          className={`text-center rounded-sm cursor-pointer ${menuStatus === 'history' ? 'bg-white font-bold' : ''}`}
          onClick={() => onClickMenu('history')}
        >
          최근 활동
        </li>
        <li
          className={`text-center rounded-sm cursor-pointer ${menuStatus === 'category' ? 'bg-white font-bold' : ''}`}
          onClick={() => onClickMenu('category')}
        >
          카테고리 통계
        </li>
      </ul>
      {/* 카테고리 별 통계 */}
      <div className="mb-0">
        {menuStatus === 'history' && <HistoryCard />}
        {menuStatus === 'category' && <CategoryStatusCard />}
      </div>

      {/* 모달 */}
      {showCategoryModal && <CategoryModal setShow={setShowCategoryModal} />}
      {showQuizModal && <QuizModal setShow={setShowQuizModal} />}
      {(showCategoryModal || showQuizModal) && <div className="fixed inset-0 bg-black/60 z-30" />}
    </div>
  )
}
