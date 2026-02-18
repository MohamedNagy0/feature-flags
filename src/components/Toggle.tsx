import { ImSpinner8 } from "react-icons/im";

interface Props {
  enabled: boolean;
  loading: boolean;
  onToggle: () => void;
}

export const Toggle = ({ enabled, loading, onToggle }: Props) => {
  return (
    <button
      onClick={onToggle}
      disabled={loading}
      aria-label={enabled ? "Disable flag" : "Enable flag"}
      className="relative inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <span className="flex items-center justify-center w-12 h-[26px]">
          <ImSpinner8 className="text-sm animate-spin text-primary" />
        </span>
      ) : (
        <span
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
            ${enabled ? "bg-primary" : "bg-gray-200"}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300
              ${enabled ? "translate-x-6" : "translate-x-1"}
            `}
          />
        </span>
      )}
    </button>
  );
};
