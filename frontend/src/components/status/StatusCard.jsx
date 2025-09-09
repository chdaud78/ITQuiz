/* 마이페이지 스테이터스 */
export default function StatusCard({ icon: Icon, value, text }) {
  return (
    <div className="p-5 bg-gray-100 flex flex-col justify-center items-center rounded-sm">
      <Icon className="text-blue-500" />
      <p className="text-blue-500 text-xl font-bold mt-3">{value}</p>
      <p className="text-gray-400 mt-1">{text}</p>
    </div>
  )
}
