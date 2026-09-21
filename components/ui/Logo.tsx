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
 * Logo do palco: troca sozinha entre a versão branca (tema escuro) e a
 * colorida (tema claro) via CSS puro, seguindo o atributo `data-claro`
 * que o MotorPalco põe no `<html>` — sem precisar passar o estado por
 * props através de Rodape/Slide. Ver a regra `.logo-*` em globals.css.
 */
export function LogoPalco({ tamanho = 40 }: { tamanho?: number }) {
  return (
    <span className="relative inline-block" style={{ height: tamanho, width: tamanho * (3360 / 1890) }}>
      <span className="logo-escura absolute inset-0">
        <Logo tamanho={tamanho} branco />
      </span>
      <span className="logo-clara absolute inset-0">
        <Logo tamanho={tamanho} />
      </span>
    </span>
  );
}

/**
 * Marca da Mindheart para o palco: troca sozinha entre a versão com o nome
 * em cinza-escuro (fundo claro) e a com o nome claro (fundo escuro), pelo
 * mesmo mecanismo do LogoPalco (atributo `data-claro` no <html>).
 */
export function MindheartPalco({ altura = 28 }: { altura?: number }) {
  const largura = Math.round((altura * 727) / 550);
  return (
    <span className="relative inline-block" style={{ height: altura, width: largura }}>
      <span className="logo-escura absolute inset-0">
        <Image src="/logo/mindheart-claro.png" alt="Mindheart" width={largura} height={altura} style={{ height: altura, width: "auto" }} />
      </span>
      <span className="logo-clara absolute inset-0">
        <Image src="/logo/mindheart.png" alt="Mindheart" width={largura} height={altura} style={{ height: altura, width: "auto" }} />
      </span>
    </span>
  );
}

/**
 * EDC + Mindheart lado a lado, sobre um painel branco — o logo da Mindheart
 * tem texto cinza-escuro e não lê bem direto sobre o fundo escuro do palco.
 */
export function LogosParceiras({ altura = 64 }: { altura?: number }) {
  return (
    <div
      className="inline-flex items-center gap-8 rounded-2xl bg-white px-6 py-3 shadow-sm"
      role="group"
      aria-label="EDC Group e Mindheart Human Development"
    >
      <Logo tamanho={altura} />
      <span aria-hidden className="h-[70%] w-px self-stretch bg-[#C9D2CE]" />
      <Image
        src="/logo/mindheart.png"
        alt="Mindheart Human Development"
        width={Math.round((altura * 727) / 550)}
        height={altura}
        style={{ height: altura, width: "auto" }}
      />
    </div>
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
