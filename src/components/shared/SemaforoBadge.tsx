import React from "react";

interface SemaforoBadgeProps {
  nivel: "verde" | "amarelo" | "vermelho";
  children?: React.ReactNode;
}

export default function SemaforoBadge({ nivel, children }: SemaforoBadgeProps) {
  const styles = {
    verde: "bg-[var(--sem-verde)] text-white",
    amarelo: "bg-[var(--sem-amarelo)] text-white",
    vermelho: "bg-[var(--sem-vermelho)] text-white",
  };

  const defaultText = {
    verde: "REGULAR",
    amarelo: "PENDENTE",
    vermelho: "IRREGULAR",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm ${styles[nivel]}`}
    >
      {children || defaultText[nivel]}
    </span>
  );
}
