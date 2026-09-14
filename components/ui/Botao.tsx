"use client";

import { motion } from "motion/react";
import type { ButtonHTMLAttributes } from "react";
import { levanta } from "@/lib/motion";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: "primario" | "secundario" | "fantasma";
  tamanho?: "normal" | "grande";
};

const VARIANTES: Record<string, string> = {
  primario: "bg-acento text-white hover:brightness-95",
  secundario: "bg-surface-2 text-ink border border-line hover:border-line-2",
  fantasma: "bg-transparent text-ink-2 hover:text-ink",
};

export function Botao({
  variante = "primario",
  tamanho = "normal",
  className = "",
  children,
  ...props
}: Props) {
  return (
    <motion.button
      {...levanta}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none ${
        VARIANTES[variante]
      } ${tamanho === "grande" ? "px-7 py-4 text-base" : "px-5 py-2.5 text-sm"} ${className}`}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
