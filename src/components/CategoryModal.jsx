export default function CategoryModal({ setShow }) {
  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  bg-white p-6 rounded-xl shadow-lg z-40 w-11/12 max-w-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">카테고리 추가</h3>
        <button className="text-xl" onClick={() => setShow(false)}>
          x
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">카테고리 이름</label>
          <input className="w-full border border-gray-300 rounded-md p-2" type="text" />
        </div>
        <div>
          <label className="block font-medium mb-1">카테고리 설명</label>
          <textarea className="w-full border border-gray-300 rounded-md p-2" />
        </div>
      </div>
      <button className="w-full py-3 mt-7 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200">
        생성
      </button>
    </div>
  )
}
