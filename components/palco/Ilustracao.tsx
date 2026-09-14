"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Personagem } from "@/conteudo/personagens";

/**
 * Ilustração do personagem — quadrinho gerado (Cloudflare Workers AI,
 * FLUX-1-schnell), não foto real de ninguém. Uma por personagem, reutilizada
 * nas duas cenas dele e na trilha. Arquivos em public/personagens/.
 */
export function Ilustracao({ personagemId, tamanho = 260 }: { personagemId: Personagem["id"]; tamanho?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-full border-2 border-acento"
      style={{ width: tamanho, height: tamanho }}
    >
      <Image
        src={`/personagens/${personagemId}.jpg`}
        alt=""
        fill
        sizes={`${tamanho}px`}
        className="object-cover"
        priority={tamanho > 200}
      />
    </motion.div>
  );
}
