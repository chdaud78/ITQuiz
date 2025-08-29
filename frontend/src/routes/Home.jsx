import { useEffect, useState } from 'react'

import { categoryApi } from '@/api/category.js'
import CategoryCard from '@/components/CategoryCard.jsx'

export default function Home() {
  const [categories, setCategory] = useState([])

  /* 명언 */
  const quotes = [
    '성공은 작은 노력의 반복이다. – 로버트 콜리어',
    '포기하지 마라. 오늘의 어려움이 내일의 성공이다.',
    '배움에는 끝이 없다. – 플라톤',
    '도전하지 않으면 얻는 것도 없다.',
    '실패는 성공의 어머니이다.',
    '작은 습관이 큰 변화를 만든다.',
    '오늘의 노력은 내일의 나를 만든다.',
    '한 걸음씩 나아가라. 중요한 것은 멈추지 않는 것이다.',
    '위대한 일은 한 번에 이루어지지 않는다. – 마더 테레사',
    '시작이 반이다. – 아리스토텔레스',
    '자신을 믿어라. 당신은 생각보다 강하다.',
    '어제보다 나은 오늘이 되자.',
    '용기는 두려움을 직면하는 것이다. – 넬슨 만델라',
    '노력 없는 재능은 무용지물이다.',
    '포기하지 않는 자만이 결국 웃는다.',
    '성공은 준비와 기회의 만남이다.',
    '실패는 끝이 아니라 배움의 시작이다.',
    '오늘의 작은 승리가 내일의 큰 성취로 이어진다.',
    '인내는 모든 어려움을 이긴다.',
    '할 수 있다고 믿으면 이미 반은 성공한 것이다.',
    '작은 성취를 축하하라. 그것이 큰 동력이 된다.',
    '꿈을 현실로 만드는 것은 행동이다.',
    '지금 시작하지 않으면 언제 시작할 것인가?',
    '과거에 머물지 말고 미래를 향해 나아가라.',
    '변화는 두려움에서 비롯되지만, 성장의 시작이다.',
    '작은 한 걸음이 위대한 여정을 만든다.',
    '문제를 피하지 말고 해결책을 찾아라.',
    '오늘의 도전이 내일의 자신감을 만든다.',
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  /* 카테고리 가져오기 */
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
      <div className="mt-10 md:mt-20 lg:mt-30 p-6 bg-blue-100 rounded-lg text-center">
        <h2 className="text-3xl font-bold">🚀 오늘도 새로운 도전을 시작해보세요! 🚀</h2>
        <p className="mt-2 text-gray-700 text-2xl">{randomQuote}</p>
      </div>
      {/* 퀴즈 카테고리 */}
      <div className="mt-10 md:mt-20 lg:mt-30">
        <h2 className="font-bold text-3xl text-center">카테고리를 선택하세요</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
          {categories.map((category, index) => (
            <CategoryCard category={category} key={category.name} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
