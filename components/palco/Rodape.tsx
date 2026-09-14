import { EVENTO } from "@/conteudo/palestrante";
import { Logo } from "@/components/ui/Logo";

export function Rodape() {
  return (
    <div className="palco-rodape">
      <Logo tamanho={22} branco />
      <span>NEUROCIÊNCIAS &amp; EQUILÍBRIO EMOCIONAL · {EVENTO.ocasiao}</span>
    </div>
  );
}
