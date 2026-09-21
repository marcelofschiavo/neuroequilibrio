import { EVENTO } from "@/conteudo/palestrante";
import { LogoPalco, MindheartPalco } from "@/components/ui/Logo";

/** Rodapé fixo de todos os slides: marcas EDC e Mindheart à esquerda, evento à direita. */
export function Rodape() {
  return (
    <div className="palco-rodape">
      <div className="flex items-center gap-4" role="group" aria-label="EDC Group e Mindheart">
        <LogoPalco tamanho={28} />
        <span aria-hidden className="h-6 w-px bg-line-2" />
        <MindheartPalco altura={28} />
      </div>
      <span>NEUROCIÊNCIAS &amp; EQUILÍBRIO EMOCIONAL · {EVENTO.ocasiao}</span>
    </div>
  );
}
