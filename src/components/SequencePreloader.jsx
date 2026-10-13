const SERIF = '"Cormorant Garamond", ui-serif, Georgia, serif';

export default function SequencePreloader({ progress, visible }) {
  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-hidden={!visible}
    >
      <p
        style={{
          fontFamily: SERIF,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "rgba(245,230,168,0.85)",
          fontSize: 12,
        }}
      >
        Preparing the experience
      </p>

      <div className="mt-6 h-px w-56 overflow-hidden bg-white/10">
        <div
          className="h-full origin-left"
          style={{
            transform: `scaleX(${progress})`,
            background: "linear-gradient(90deg, transparent, #d4af37, #f5e6a8)",
            transition: "transform 0.2s linear",
          }}
        />
      </div>

      <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-white/40">
        {Math.round(progress * 100)}%
      </p>
    </div>
  );
}
