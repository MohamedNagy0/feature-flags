import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { FeatureFlag } from "../types";
import { fetchFeatureFlags, toggleFeatureFlag } from "../api/featureFlags";

export const useFeatureFlags = () => {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const loadFlags = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchFeatureFlags();
      setFlags(data);
    } catch {
      toast.error("Failed to load feature flags.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFlags();
  }, [loadFlags]);

  const toggle = useCallback(
    async (id: string) => {
      const flag = flags.find((f) => f.id === id);
      if (!flag) return;

      // Optimistic update
      setFlags((prev) =>
        prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)),
      );
      setTogglingId(id);

      try {
        await toggleFeatureFlag(id, !flag.enabled);
        toast.success(
          `${flag.name} ${!flag.enabled ? "enabled" : "disabled"} successfully.`,
        );
      } catch {
        // Revert on error
        setFlags((prev) =>
          prev.map((f) => (f.id === id ? { ...f, enabled: flag.enabled } : f)),
        );
        toast.error(`Failed to update "${flag.name}". Please try again.`);
      } finally {
        setTogglingId(null);
      }
    },
    [flags],
  );

  return { flags, loading, togglingId, toggle };
};
