"use client";

import { motion } from "motion/react";
import { HORAS_DO_DIA, type HoraDoDia } from "@/conteudo/marina";
import { usePalco } from "./PalcoContext";

/** Linha do tempo vertical do dia da Marina — mostra onde a história está. */
export function LinhaDoDia({ hora }: { hora: HoraDoDia }) {
  const { reduzido } = usePalco();
  const atual = HORAS_DO_DIA.indexOf(hora);

  return (
    <div
      role="img"
      aria-label={`Linha do tempo do dia da Marina. Agora são ${hora}.`}
      className="relative flex min-h-[46vh] shrink-0 flex-col justify-between py-1"
    >
      <span aria-hidden className="absolute bottom-3 left-[13px] top-3 w-1.5 rounded-full bg-line-2" />
      {HORAS_DO_DIA.map((h, i) => {
        const ativa = i === atual;
        const passada = i < atual;
        return (
          <div key={h} className="relative flex items-center gap-3">
            <span className="relative flex h-7 w-7 items-center justify-center">
              {ativa && !reduzido && (
                <motion.span
                  aria-hidden
                  className="absolute h-7 w-7 rounded-full bg-acento"
                  animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <span
                aria-hidden
                className={`relative h-5 w-5 rounded-full border-[3px] ${
                  ativa ? "scale-125 border-acento bg-acento" : passada ? "border-acento bg-acento" : "border-line-2 bg-bg"
                }`}
              />
            </span>
            <span
              className={`dados text-palco-nota ${ativa ? "font-black text-acento" : passada ? "font-semibold text-ink-2" : "text-muted"}`}
            >
              {h}
            </span>
          </div>
        );
      })}
    </div>
  );
}
