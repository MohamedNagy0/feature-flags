import { useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import {
  HiOutlineFlag,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi";
import { useFeatureFlags } from "./hooks/useFeatureFlags";
import { FlagsTable } from "./components/FlagsTable";
import { Filters as FiltersComponent } from "./components/Filters";
import { Filters } from "./types";
import { StatCard } from "./components/StatCard";

export default function App() {
  const { flags, loading, togglingId, toggle } = useFeatureFlags();
  const [filters, setFilters] = useState<Filters>({
    environment: "all",
    status: "all",
  });
  const [filteredCount, setFilteredCount] = useState(0);

  const stats = useMemo(
    () => ({
      total: flags.length,
      enabled: flags.filter((f) => f.enabled).length,
      disabled: flags.filter((f) => !f.enabled).length,
    }),
    [flags],
  );

  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="w-12 h-12 bg-gray-200">
            <img src="/logo.webp" alt="logo" className="w-full h-full" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight text-gray-900">
              Feature Flags
            </h1>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="px-4 py-8 mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Flags"
            value={loading ? 0 : stats.total}
            icon={<HiOutlineFlag className="text-[#4990d4] text-xl" />}
            color="bg-[#4990d4]/10"
          />
          <StatCard
            label="Enabled"
            value={loading ? 0 : stats.enabled}
            icon={<HiOutlineCheckCircle className="text-xl text-emerald-500" />}
            color="bg-emerald-50"
          />
          <StatCard
            label="Disabled"
            value={loading ? 0 : stats.disabled}
            icon={<HiOutlineXCircle className="text-xl text-gray-400" />}
            color="bg-gray-100"
          />
        </div>

        {/* Filters */}
        <FiltersComponent
          filters={filters}
          onChange={setFilters}
          totalCount={flags.length}
          filteredCount={filteredCount}
        />

        {/* Table */}
        <FlagsTable
          flags={flags}
          loading={loading}
          togglingId={togglingId}
          onToggle={toggle}
          filters={filters}
          filteredCount={setFilteredCount}
        />
      </main>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
          },
          success: {
            iconTheme: { primary: "#4990d4", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#fff" },
          },
        }}
      />
    </div>
  );
}
