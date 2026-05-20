"use client";

type InputProps = {
  label: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  readonly?: boolean;
  value?: string | number;
};

export function InputComponent({
  label,
  readonly = false,
  value,
  type,
  placeholder,
  onChange,
  id,
  name,
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-200">
        {label}
      </label>

      <input
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readonly}
        required
        className="w-full px-3 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
      />
    </div>
  );
}