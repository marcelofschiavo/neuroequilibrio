import { EVENTO } from "@/conteudo/palestrante";
import { LogoPalco } from "@/components/ui/Logo";

export function Rodape() {
  return (
    <div className="palco-rodape">
      <LogoPalco tamanho={22} />
      <span>NEUROCIÊNCIAS &amp; EQUILÍBRIO EMOCIONAL · {EVENTO.ocasiao}</span>
    </div>
  );
}
