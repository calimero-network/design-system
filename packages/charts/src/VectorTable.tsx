import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

// ---------------------- Instant Vector Table ----------------------

export type PromVectorResult = {
  status: string;
  data: {
    resultType: "vector";
    result: Array<{ metric: Record<string,string>; value: [number, string] }>;
  }
};

export function VectorTable({ 
  vector, 
  title = "Instant Vector" 
}: { 
  vector: PromVectorResult; 
  title?: string 
}) {
  const rows = vector?.data?.result ?? [];
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-white/90 truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-400">
              <tr>
                <th className="py-2 pr-2">instance</th>
                <th className="py-2 pr-2">container</th>
                <th className="py-2 pr-2">reason</th>
                <th className="py-2 pr-2">path</th>
                <th className="py-2 pr-2">value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-[#1b2233]">
                  <td className="py-2 pr-2 font-mono">{r.metric.instance}</td>
                  <td className="py-2 pr-2">{r.metric.container}</td>
                  <td className="py-2 pr-2">{r.metric.reason ?? "—"}</td>
                  <td className="py-2 pr-2 font-mono truncate max-w-[320px]">{r.metric.path ?? "*"}</td>
                  <td className="py-2 pr-2 tabular-nums">{r.value?.[1] ?? "0"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
