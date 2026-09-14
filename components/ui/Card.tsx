import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-lg border border-line bg-surface-2 p-5 ${className}`} {...props} />;
}

export function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-dados text-[10px] uppercase tracking-[0.14em] text-acento">
      {children}
    </span>
  );
}
