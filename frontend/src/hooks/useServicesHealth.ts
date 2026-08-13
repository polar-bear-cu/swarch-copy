import { useEffect, useState } from "react";
import {
  checkGatewayHealth,
  checkAuthHealth,
  checkRoomHealth,
  checkCollabHealth,
  checkCodeRunnerHealth,
} from "@/api/health-check";
import type { HealthCheckResult } from "@/types/health";

const SERVICES = [
  { name: "gateway", check: checkGatewayHealth },
  { name: "auth", check: checkAuthHealth },
  { name: "room", check: checkRoomHealth },
  { name: "collab", check: checkCollabHealth },
  { name: "code-runner", check: checkCodeRunnerHealth },
];

type ResultsState = Record<string, HealthCheckResult | undefined>;

export function useServicesHealth() {
  const [results, setResults] = useState<ResultsState>({});
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);

  const recheck = () => {
    setResults({});
    Promise.allSettled(
      SERVICES.map(({ check }) =>
        check().then((result) => {
          setResults((prev) => ({ ...prev, [result.service]: result }));
        }),
      ),
    ).then(() => setCheckedAt(new Date()));
  };

  useEffect(() => {
    void Promise.resolve().then(recheck);
  }, []);

  return {
    results,
    checkedAt,
    recheck,
    serviceNames: SERVICES.map((s) => s.name),
  };
}
