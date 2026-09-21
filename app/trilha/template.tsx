"use client";

import { motion } from "motion/react";
import { ENTRADA } from "@/lib/motion";

/** Toda página da trilha entra com um leve fade + subida (o template remonta a cada navegação). */
export default function TemplateTrilha({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: ENTRADA }}>
      {children}
    </motion.div>
  );
}
