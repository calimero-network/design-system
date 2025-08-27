import React from "react";

// ---------------------- Minimal Card primitives (fallback) ----------------------

export function Card({ className = "", children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-2xl border p-3 ${className}`} style={{background:'#1A1A1A', borderColor:'#404040'}}>{children}</div>;
}

export function CardHeader({ className = "", children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`flex items-center justify-between ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`text-white font-medium ${className}`}>{children}</div>;
}

export function CardContent({ className = "", children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={className}>{children}</div>;
}
