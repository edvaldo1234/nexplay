export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="NEXPLAY">
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
        <rect width="30" height="30" rx="8" fill="#E11D48" />
        <path d="M11 8.5v13l10-6.5z" fill="#fff" />
      </svg>
      <span className="text-xl font-bold tracking-tight">NEX<span className="text-brand">PLAY</span></span>
    </div>
  );
}
