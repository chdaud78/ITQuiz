import { Brain, History, Trophy, Activity, Book, Library, Star, Files, Laptop } from 'lucide-react'

export default function CategoryCard({ category, index }) {
  const icons = [Brain, History, Trophy, Activity, Book, Library, Star, Files, Laptop]
  const bgColors = [
    'bg-red-200',
    'bg-blue-200',
    'bg-violet-200',
    'bg-lime-200',
    'bg-cyan-200',
    'bg-sky-200',
    'bg-fuchsia-200',
    'bg-gray-200',
    'bg-green-200',
    'bg-stone-200',
    'bg-emerald-200',
    'bg-indigo-200',
    'bg-amber-200',
    'bg-emerald-200',
    'bg-orange-200',
  ]
  const brColors = [
    'border-red-500',
    'border-blue-500',
    'border-violet-500',
    'border-lime-500',
    'border-cyan-500',
    'border-sky-500',
    'border-fuchsia-500',
    'border-gray-500',
    'border-green-500',
    'border-stone-500',
    'border-emerald-500',
    'border-indigo-500',
    'border-amber-500',
    'border-emerald-500',
    'border-orange-500',
  ]

  const IconComponent = icons[index % icons.length]

  return (
    <div
      className={`p-5 border rounded-sm ${bgColors[index]} ${brColors[index]}`}
      key={category.name}
    >
      <div className="flex justify-between items-start">
        <div className="rounded-sm p-3 bg-white">
          <IconComponent className="text-red-200 w-6 h-6" />
        </div>
        <span className="text-sm text-gray-300 bg-white block px-3 py-1 rounded-xl">5문제</span>
      </div>

      <h3 className="font-bold mt-5">{category.name}</h3>
      <p className="flex-1 text-gray-500 mt-3 line-clamp-3">{category.description}</p>

      <button className="w-full bg-white p-3 rounded-sm mt-5 cursor-pointer">시작하기</button>
    </div>
  )
}
