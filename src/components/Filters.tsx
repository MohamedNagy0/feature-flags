import { Filters as FiltersType, Environment } from "../types";
import { HiFilter } from "react-icons/hi";

interface Props {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
  totalCount: number;
  filteredCount: number;
}

const environments: Array<{ value: "all" | Environment; label: string }> = [
  { value: "all", label: "All Environments" },
  { value: "development", label: "Development" },
  { value: "staging", label: "Staging" },
  { value: "production", label: "Production" },
];

const statuses: Array<{ value: FiltersType["status"]; label: string }> = [
  { value: "all", label: "All Status" },
  { value: "enabled", label: "Enabled" },
  { value: "disabled", label: "Disabled" },
];

export const Filters = ({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-[#f4f4f4] rounded-xl border border-gray-200">
      <div className="flex items-center gap-2 text-gray-500 shrink-0">
        <HiFilter className="text-[#4990d4]" />
        <span className="text-sm font-medium text-gray-600">Filters</span>
      </div>

      <div className="flex flex-wrap flex-1 gap-3">
        <select
          value={filters.environment}
          onChange={(e) =>
            onChange({
              ...filters,
              environment: e.target.value as FiltersType["environment"],
            })
          }
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4990d4] focus:border-transparent text-gray-700 cursor-pointer"
        >
          {environments.map((env) => (
            <option key={env.value} value={env.value}>
              {env.label}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            onChange({
              ...filters,
              status: e.target.value as FiltersType["status"],
            })
          }
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4990d4] focus:border-transparent text-gray-700 cursor-pointer"
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <span className="text-sm text-gray-500 shrink-0">
        Showing{" "}
        <span className="font-semibold text-[#4990d4]">{filteredCount}</span> of{" "}
        <span className="font-semibold">{totalCount}</span>
      </span>
    </div>
  );
};
