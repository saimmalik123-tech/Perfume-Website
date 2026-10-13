import { forwardRef } from "react";

const SERIF = '"Cormorant Garamond", ui-serif, Georgia, serif';

const LAYOUTS = {
  center: {
    wrapper: "items-center justify-center text-center",
    inner: "max-w-3xl",
  },
  left: {
    wrapper: "items-center justify-start px-6 lg:px-20 text-left",
    inner: "max-w-md",
  },
  bottomCenter: {
    wrapper: "items-end justify-center px-6 pb-24 text-center",
    inner: "max-w-2xl",
  },
};

const ChapterText = forwardRef(function ChapterText(
  {
    layout = "center",
    eyebrow,
    title,
    body,
    signature,
    titleUppercase = true,
    titleColor = "#f5e6a8",
  },
  ref,
) {
  const cfg = LAYOUTS[layout] || LAYOUTS.center;

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 flex ${cfg.wrapper}`}
      style={{ opacity: 0 }}
    >
      <div className={cfg.inner}>
        {eyebrow && (
          <p
            className="mb-4 text-[10px] uppercase tracking-[0.5em]"
            style={{ color: "#d4af37" }}
          >
            {eyebrow}
          </p>
        )}

        {title && (
          <h3
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(28px, 5vw, 66px)",
              letterSpacing: "0.08em",
              textTransform: titleUppercase ? "uppercase" : "none",
              color: titleColor,
              lineHeight: 1.06,
              whiteSpace: "pre-line",
            }}
          >
            {title}
          </h3>
        )}

        {body && (
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60">
            {body}
          </p>
        )}

        {signature && (
          <p className="mt-4 text-xs uppercase tracking-[0.4em] text-white/50">
            {signature}
          </p>
        )}
      </div>
    </div>
  );
});

export default ChapterText;
