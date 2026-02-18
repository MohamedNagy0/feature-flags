export const StatCard = ({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className="flex items-center gap-4 p-5 bg-white border border-gray-200 shadow-sm rounded-xl">
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs font-medium text-gray-500">{label}</p>
    </div>
  </div>
);
