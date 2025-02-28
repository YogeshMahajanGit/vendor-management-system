export default function Inputs({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className="w-full  text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      />
    </div>
  );
}
