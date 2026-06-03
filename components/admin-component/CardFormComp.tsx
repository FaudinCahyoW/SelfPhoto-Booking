interface CardFormCompProps {
  inputs: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function CardFormComp({ inputs, onSubmit }: CardFormCompProps) {
  return (
    <div className="w-full max-w-3xl rounded-3xl border border-gray-800 bg-neutral-950/80 backdrop-blur-md shadow-2xl sm:p-5 transition-all duration-300">
      <form onSubmit={onSubmit}>
        <div className="text-gray-200">
          {inputs}
        </div>

        <div className="flex justify-end pt-5">
          <button
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 font-semibold text-sm shadow-lg shadow-emerald-900/20 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Add Content
          </button>
        </div>
      </form>
    </div>
  );
}
