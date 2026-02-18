import { FeatureFlag, Filters } from "../types";
import { EnvironmentBadge } from "./EnvironmentBadge";
import { Toggle } from "./Toggle";
import { SkeletonRow } from "./SkeletonRow";
import { HiOutlineFlag } from "react-icons/hi";
import { useEffect } from "react";

interface Props {
  flags: FeatureFlag[];
  loading: boolean;
  togglingId: string | null;
  onToggle: (id: string) => void;
  filters: Filters;
  filteredCount: (count: number) => void;
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const HEADERS = [
  "Flag Name",
  "Environment",
  "Status",
  "Created Date",
  "Action",
];

export const FlagsTable = ({
  flags,
  loading,
  togglingId,
  onToggle,
  filters,
  filteredCount,
}: Props) => {
  const filtered = flags.filter((flag) => {
    const envMatch =
      filters.environment === "all" || flag.environment === filters.environment;
    const statusMatch =
      filters.status === "all" ||
      (filters.status === "enabled" && flag.enabled) ||
      (filters.status === "disabled" && !flag.enabled);
    return envMatch && statusMatch;
  });

  useEffect(() => {
    filteredCount(filtered.length);
  }, [filtered.length, filteredCount]);

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-xl">
      <table className="w-full divide-y divide-gray-100 min-w-[800px]">
        <thead>
          <tr className="bg-[#f4f4f4]">
            {HEADERS.map((h) => (
              <th
                key={h}
                scope="col"
                className={`px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider ${h === "Action" ? "text-center" : "text-left"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
          ) : filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <HiOutlineFlag className="text-4xl text-gray-300" />
                  <p className="text-sm font-medium">
                    No feature flags match your filters.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            filtered.map((flag) => (
              <tr
                key={flag.id}
                className="hover:bg-[#f4f4f4]/50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${flag.enabled ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <span className="font-mono text-sm font-medium text-gray-800">
                      {flag.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <EnvironmentBadge environment={flag.environment} />
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium ${flag.enabled ? "text-[#4990d4]" : "text-gray-400"}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${flag.enabled ? "bg-[#4990d4]" : "bg-gray-300"}`}
                    />
                    {flag.enabled ? "Enabled" : "Disabled"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">
                    {formatDate(flag.createdAt)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Toggle
                    enabled={flag.enabled}
                    loading={togglingId === flag.id}
                    onToggle={() => onToggle(flag.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
