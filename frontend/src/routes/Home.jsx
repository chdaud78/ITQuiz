import CategoryCard from '@/components/category/CategoryCard.jsx'
import LifeQuotes from '@/components/information/LifeQuotes.jsx'

export default function Home() {
  return (
    /* 소개 글 */
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">당신의 지식을 테스트해보세요!</h1>
        <p className="mt-4 text-gray-600">
          다양한 카테고리의 퀴즈를 풀며 학습 효과를 높이고, 자신의 점수와 기록을 확인할 수 있습니다.
        </p>
      </div>
      {/* 사용 방법 설명 */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 border rounded shadow-sm text-center">
          <h2 className="font-bold text-lg">1. 카테고리 선택</h2>
          <p className="mt-2 text-gray-500">원하는 주제를 선택해 퀴즈를 시작하세요.</p>
        </div>
        <div className="p-5 border rounded shadow-sm text-center">
          <h2 className="font-bold text-lg">2. 문제 풀기</h2>
          <p className="mt-2 text-gray-500">문제를 풀고 즉시 정답과 점수를 확인하세요.</p>
        </div>
        <div className="p-5 border rounded shadow-sm text-center">
          <h2 className="font-bold text-lg">3. 기록 확인</h2>
          <p className="mt-2 text-gray-500">완료한 퀴즈와 통계를 확인하며 실력을 향상시키세요.</p>
        </div>
      </div>
      {/* 명언 */}
      <LifeQuotes />
      {/* 퀴즈 카테고리 */}
      <div className="mt-10 md:mt-20 lg:mt-30">
        <h2 className="font-bold text-3xl text-center">카테고리를 선택하세요</h2>
        <CategoryCard />
      </div>
    </div>
  )
}
