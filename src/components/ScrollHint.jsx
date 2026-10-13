export default function ScrollHint({ visible = true }) {
  return (
    <div
      className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-white/40">
        Scroll
      </p>
      <span
        className="mx-auto block h-8 w-px"
        style={{
          background:
            "linear-gradient(180deg, rgba(212,175,55,0.8), transparent)",
        }}
      />
    </div>
  );
}
