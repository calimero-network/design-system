import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

// ---------------------- Time‑series ----------------------

export type Point = { t: number | string; y: number };

export type Series = { name: string; data: Point[] };

function formatTime(ts: number | string) {
  const d = typeof ts === 'number' ? new Date(ts) : new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function SeriesCard({ 
  title, 
  series, 
  yLabel 
}: { 
  title: string; 
  series: Series[]; 
  yLabel?: string; 
}) {
  const flat = series.flatMap(s => s.data);
  const domainY = useMemo(() => {
    if (!flat.length) return [0, 1];
    const min = Math.min(...flat.map(p => p.y));
    const max = Math.max(...flat.map(p => p.y));
    const pad = (max - min) * 0.1 || 1;
    return [Math.max(0, min - pad), max + pad];
  }, [flat]);

  const rows = useMemo(() => {
    const length = Math.max(...series.map(s => s.data.length));
    const ts = series[0]?.data.map(p => p.t) ?? [];
    return Array.from({length}, (_, i) => {
      const row: any = { t: ts[i] ?? i };
      for (const s of series) row[s.name] = s.data[i]?.y ?? null;
      return row;
    });
  }, [series]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-white/90 truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ left: 12, right: 12, top: 5, bottom: 5 }}>
            <XAxis dataKey="t" tickFormatter={formatTime} minTickGap={32}/>
            <YAxis domain={domainY as [number, number]} tickFormatter={(v) => `${v}`}/>
            <Tooltip labelFormatter={(l) => `Time: ${formatTime(l as any)}`} formatter={(v) => [v as number, yLabel ?? "value"]}/>
            <Legend />
            {series.map((s) => (
              <Line key={s.name} type="monotone" dataKey={s.name} dot={false} strokeWidth={2} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
