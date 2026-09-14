"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";

/** Número que conta do zero até o valor-alvo. Reseta a cada slide novo (key). */
export function ContagemNumero({
  valor,
  className,
}: {
  valor: number;
  className?: string;
}) {
  const [exibido, setExibido] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(0, valor, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setExibido(Math.round(v)),
    });
    return () => controls.stop();
  }, [valor]);

  return (
    <span ref={ref} className={className}>
      {exibido.toLocaleString("pt-BR")}
    </span>
  );
}
