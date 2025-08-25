export default function HistoryCard () {
  return (
    <div className="mt-5 p-5 border-1 rounded-sm">
      <h2 className="text-xl font-bold">✏️ 최근 퀴즈 기록</h2>
      <div className="mt-5">
      <div className="mt-3 pb-3 flex justify-between items-center border-b-1">
        <div>
          <p className="text-lg">과학 퀴즈</p>
          <p className="text-sm text-gray-500">2024.01.20</p>
        </div>
        <div>
          <p className="text-lg font-bold">4/5</p>
          <p className="text-sm text-gray-500">80%</p>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div>
          <p className="text-lg">과학 퀴즈</p>
          <p className="text-sm text-gray-500">2024.01.20</p>
        </div>
        <div>
          <p className="text-lg font-bold">4/5</p>
          <p className="text-sm text-gray-500">80%</p>
        </div>
      </div>
      </div>
    </div>
  )
}