const InputForm = ({ text, name, value, onChange, type, className, error }) => (
  <>
    <label htmlFor="">{text}</label>
    <input
      className={`mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition${
        className
      }`}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
    />
    {error ? <p className="text-sm text-red-500">{error}</p> : ''}
  </>
)

export default InputForm
