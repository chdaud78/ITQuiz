export default function CategoryStatusCard () {
  return (
    <div>
      <div className="p-5 mt-5 border-1 rounded-sm">
        <h2 className="font-bold text-lg">과학</h2>
        <div className="flex justify-between mt-5">
          <p className="text-gray-500">완료한 퀴즈</p>
          <p>12회</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-gray-500">정답률</p>
          <p>82%</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-gray-500">최고 점수</p>
          <p>5/5</p>
        </div>
      </div>
    </div>
  )
}