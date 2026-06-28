interface FonteLegalChipProps {
  lei: string;
  artigo?: string;
  onClick?: () => void;
}

export default function FonteLegalChip({ lei, artigo, onClick }: FonteLegalChipProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Simulate opening legislation
      alert(`Abrindo legislação: ${lei} ${artigo ? `- ${artigo}` : ""}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1 bg-[var(--gov-blue)] text-white hover:bg-[var(--gov-blue-dark)] px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold uppercase tracking-wide transition-colors ml-2 align-middle shadow-sm cursor-pointer"
      title={`Consultar fonte legal: ${lei}`}
    >
      <span className="material-symbols-outlined text-[12px] sm:text-[14px]">gavel</span>
      {lei} {artigo && `· ${artigo}`}
    </button>
  );
}
