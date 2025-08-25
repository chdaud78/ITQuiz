import {useState} from "react";

export default function QuizCard () {
  const [selected, setSelected] = useState(null)

  const options = [
    {key: "A", text: "이것"},
    {key: "B", text: "저것"},
    {key: "C", text: "요것"},
    {key: "D", text: "몰라것"},
  ]

  return (
    <div className="mt-5 p-5 border-1 rounded-sm">
      <h3 className="text-xl font-bold text-center">운영체제에서 이것은 무엇인가요?</h3>
      <div className="mt-5">
        {options.map((opt) => (
          <div
            key={opt.key}
            onClick={() => setSelected(opt.key)}
               className={`flex mt-3 p-5 border rounded-sm cursor-pointer transition 
              ${selected === opt.key ? "bg-blue-100 border-blue-400" : "hover:bg-gray-50"}`}>
            <p className="text-blue-500 font-bold">{opt.key}.</p>
            <p className="ml-5">{opt.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3">
        <button className="border-1 py-3 bg-gray-100">이전</button>
        <button className="border-1 py-3 bg-blue-500 text-white">다음</button>
      </div>
    </div>
  )
}