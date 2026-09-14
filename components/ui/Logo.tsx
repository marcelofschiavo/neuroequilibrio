import Image from "next/image";

/**
 * Logo EDC Group. `branco` usa a versão negativa (palco, fundo grafite);
 * a leitura usa a versão colorida. Ambas vêm de public/logo/.
 */
export function Logo({ tamanho = 40, branco = false }: { tamanho?: number; branco?: boolean }) {
  const src = branco ? "/logo/edc-branco.png" : "/logo/edc-cor.png";
  const proporcao = branco ? 3360 / 1890 : 499 / 308;
  return (
    <Image
      src={src}
      alt="EDC Group"
      width={Math.round(tamanho * proporcao)}
      height={tamanho}
      priority
      style={{ height: tamanho, width: "auto" }}
    />
  );
}

/**
 * O traço: a barra verde horizontal que corta o "EDC" no logo. Vira elemento
 * recorrente — linha do tempo, divisória de bloco, progresso da trilha.
 */
export function Traco({ largura = 64, altura = 6, className = "" }: { largura?: number; altura?: number; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full bg-acento ${className}`}
      style={{ width: largura, height: altura }}
      aria-hidden
    />
  );
}
