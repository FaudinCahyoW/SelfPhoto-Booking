import { useState } from "react";

type TimeRange = {
  start_time: string;
  end_time: string;
};

const ranges: TimeRange[] = [
  { start_time: "08:00", end_time: "09:00" },
  { start_time: "10:00", end_time: "11:00" },
  { start_time: "13:00", end_time: "15:00" },
  { start_time: "16:00", end_time: "17:00" },
  { start_time: "18:00", end_time: "19:00" },
];

export default function SimpleTimePicker() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="w-64">
      {/* Label */}
      <p className="mb-2 text-sm text-gray-500">Pilih Waktu</p>

      <div className="relative">
        {/* List */}
        <div className="max-h-44 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          {ranges.map((r, i) => {
            const isActive = selected === i;

            return (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className={`px-4 py-3 cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {r.start_time} - {r.end_time}
              </div>
            );
          })}
        </div>

        {/* Fade atas */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white to-transparent rounded-t-2xl" />

        {/* Fade bawah */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent rounded-b-2xl" />
      </div>

      {/* Selected preview */}
      <div className="mt-3 text-sm text-gray-600">
        {selected !== null
          ? `Dipilih: ${ranges[selected].start_time} - ${ranges[selected].end_time}`
          : "Belum pilih waktu"}
      </div>
    </div>
  );
}