interface StatCardProps {
  title: string;
  value: number;
  points: string;
}

export default function StatCard({
  title,
  value,
  points,
}: StatCardProps) {
  return (
    <div className="bg-white px-6 py-7">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-3 text-[26px] font-medium text-slate-700">
        {value.toLocaleString()}
      </p>

      <div className="mt-3 h-[45px] w-full">
        <svg
          viewBox="0 0 300 50"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-blue-400"
          />
        </svg>
      </div>
    </div>
  );
}