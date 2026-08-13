import { useServicesHealth } from "@/hooks/useServicesHealth";
import { ENV } from "@/config/env";

export default function StatusPage() {
  const { results, checkedAt, recheck, serviceNames } = useServicesHealth();

  return (
    <section>
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Service status</h1>
        <button
          type="button"
          onClick={recheck}
          className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
        >
          Recheck
        </button>
      </div>
      {checkedAt && (
        <p className="text-sm text-gray-500">Last checked: {checkedAt.toLocaleTimeString()}</p>
      )}

      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr>
            <th className="p-2">Service</th>
            <th className="p-2">URL</th>
            <th className="p-2">Status</th>
            <th className="p-2">Latency</th>
            <th className="p-2">Detail</th>
          </tr>
        </thead>
        <tbody>
          {serviceNames.map((name) => {
            const result = results[name];
            return (
              <tr key={name} className="border-t">
                <td className="p-2 font-medium">{name}</td>
                <td className="p-2 text-gray-500">
                  {result ? ENV.GATEWAY_SERVICE_URL + result.path : "—"}
                </td>
                <td className="p-2">
                  {!result && <span className="text-gray-400">checking…</span>}
                  {result?.state === "ok" && <span className="text-green-600">● up</span>}
                  {result?.state === "error" && <span className="text-red-600">● down</span>}
                </td>
                <td className="p-2">{result ? `${Math.round(result.latencyMs)} ms` : "—"}</td>
                <td className="p-2 text-gray-500">
                  {result?.state === "ok" && JSON.stringify(result.data)}
                  {result?.state === "error" && result.message}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
