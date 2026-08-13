import { useEffect, useState } from "react";
import { checkServiceHealth } from "@/api/health-check";
import { SERVICE_TARGETS } from "@/config/services";
import type { HealthCheckResult } from "@/types/health";

type ResultsState = Record<string, HealthCheckResult | undefined>;

export function useServicesHealth() {
  const [results, setResults] = useState<ResultsState>({});
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);

  const recheck = () => {
    setResults({});
    Promise.allSettled(
      SERVICE_TARGETS.map((target) =>
        checkServiceHealth(target).then((result) => {
          setResults((prev) => ({ ...prev, [result.service]: result }));
        }),
      ),
    ).then(() => setCheckedAt(new Date()));
  };

  useEffect(() => {
    void Promise.resolve().then(recheck);
  }, []);

  return { results, checkedAt, recheck };
}
