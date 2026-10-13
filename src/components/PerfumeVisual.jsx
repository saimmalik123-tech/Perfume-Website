import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

const PerfumeVisual = forwardRef(function PerfumeVisual(
  { src, alt = "Perfume bottle" },
  outerRef,
) {
  const [errored, setErrored] = useState(false);

  const rootRef = useRef(null);
  const bottleRef = useRef(null);
  const reflectRef = useRef(null);
  const haloRef = useRef(null);
  const haloInnerRef = useRef(null);
  const sweepRef = useRef(null);
  const shadowRef = useRef(null);
  const sparklesRef = useRef(null);
  const captionRef = useRef(null);

  useImperativeHandle(outerRef, () => ({
    root: rootRef.current,
    bottle: bottleRef.current,
    reflect: reflectRef.current,
    halo: haloRef.current,
    haloInner: haloInnerRef.current,
    sweep: sweepRef.current,
    shadow: shadowRef.current,
    sparkles: sparklesRef.current,
    caption: captionRef.current,
  }));

  /* ---------- Idle animation (infinite, always-on) ---------- */
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Bottle gentle float + micro rotation
      gsap.to(bottleRef.current, {
        y: -16,
        rotate: 0.6,
        duration: 4.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(bottleRef.current, {
        rotate: -0.6,
        duration: 6.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Reflection mirrors the float with opposite sign
      gsap.to(reflectRef.current, {
        y: 16,
        scaleY: 0.94,
        opacity: 0.28,
        duration: 4.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Halo slow rotation (two layers, opposite directions)
      gsap.to(haloRef.current, {
        rotate: 360,
        duration: 60,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
      gsap.to(haloInnerRef.current, {
        rotate: -360,
        duration: 90,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
      // Halo breathing
      gsap.to([haloRef.current, haloInnerRef.current], {
        scale: 1.08,
        opacity: 0.42,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Light sweep across the glass — loops
      gsap.fromTo(
        sweepRef.current,
        { xPercent: -140, opacity: 0 },
        {
          xPercent: 140,
          opacity: 0.9,
          duration: 3.6,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 2.6,
        },
      );

      // Ground shadow — squashes with the float
      gsap.to(shadowRef.current, {
        scaleX: 0.82,
        opacity: 0.35,
        duration: 4.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Sparkle particles — random twinkle on a staggered loop
      const sparkles = gsap.utils.toArray(".perfume-sparkle");
      sparkles.forEach((s, i) => {
        gsap.set(s, {
          transformOrigin: "50% 50%",
          scale: 0,
          opacity: 0,
        });
        gsap.to(s, {
          keyframes: [
            { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
            { scale: 0.2, opacity: 0, duration: 0.9, ease: "power2.in" },
          ],
          repeat: -1,
          repeatDelay: 1.2 + i * 0.7,
          delay: i * 0.5,
        });
      });

      // Caption slow fade-in-out pulse
      gsap.to(captionRef.current, {
        opacity: 0.55,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex flex-col items-center"
      style={{ width: "min(360px, 72%)" }}
    >
      {/* ── Ambient halo layers ───────────────────────────── */}
      <div
        ref={haloRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 640,
          height: 640,
          borderRadius: "9999px",
          background:
            "conic-gradient(from 0deg, rgba(212,175,55,0) 0deg, rgba(212,175,55,0.20) 90deg, rgba(245,230,168,0.34) 180deg, rgba(212,175,55,0.14) 270deg, rgba(212,175,55,0) 360deg)",
          filter: "blur(70px)",
          opacity: 0.55,
          willChange: "transform, opacity",
        }}
      />
      <div
        ref={haloInnerRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 440,
          height: 440,
          borderRadius: "9999px",
          background:
            "conic-gradient(from 180deg, rgba(245,230,168,0) 0deg, rgba(245,230,168,0.22) 120deg, rgba(212,175,55,0.16) 240deg, rgba(245,230,168,0) 360deg)",
          filter: "blur(50px)",
          opacity: 0.4,
          willChange: "transform, opacity",
        }}
      />

      {/* ── Bottle stack (bottle + reflection + sweep) ────── */}
      <div className="relative" style={{ willChange: "transform" }}>
        {/* Bottle wrapper — GSAP drives this */}
        <div
          ref={bottleRef}
          className="relative"
          style={{ willChange: "transform" }}
        >
          {!errored ? (
            <img
              src={src}
              alt={alt}
              onError={() => setErrored(true)}
              draggable={false}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                filter:
                  "drop-shadow(0 30px 60px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(212,175,55,0.30))",
              }}
            />
          ) : (
            <FallbackFlacon />
          )}

          {/* Glass sweep — bright diagonal highlight */}
          <div
            ref={sweepRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ borderRadius: 12, mixBlendMode: "screen" }}
          >
            <div
              className="absolute top-0 h-full"
              style={{
                width: "42%",
                background:
                  "linear-gradient(100deg, transparent 0%, rgba(245,230,168,0.55) 45%, rgba(255,255,255,0.9) 50%, rgba(245,230,168,0.55) 55%, transparent 100%)",
                filter: "blur(6px)",
                transform: "skewX(-12deg)",
              }}
            />
          </div>

          {/* Sparkles — positioned over the bottle */}
          <div
            ref={sparklesRef}
            aria-hidden
            className="pointer-events-none absolute inset-0"
          >
            {[
              { top: "18%", left: "22%", size: 6, delay: 0 },
              { top: "34%", left: "72%", size: 4, delay: 0.4 },
              { top: "58%", left: "14%", size: 5, delay: 0.9 },
              { top: "72%", left: "82%", size: 7, delay: 0.2 },
              { top: "46%", left: "48%", size: 3, delay: 1.1 },
              { top: "12%", left: "58%", size: 4, delay: 1.5 },
              { top: "82%", left: "32%", size: 5, delay: 0.7 },
            ].map((s, i) => (
              <span
                key={i}
                className="perfume-sparkle"
                style={{
                  position: "absolute",
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  borderRadius: "9999px",
                  background:
                    "radial-gradient(circle, #fff 0%, rgba(245,230,168,0.9) 40%, transparent 70%)",
                  filter: "blur(0.4px)",
                  boxShadow: "0 0 12px rgba(245,230,168,0.9)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Reflection — a mirrored, blurred, faded copy */}
        <div
          ref={reflectRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-full w-full"
          style={{
            transform: "scaleY(-1) translateY(0)",
            transformOrigin: "top center",
            opacity: 0.22,
            filter: "blur(6px)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 70%)",
          }}
        >
          {!errored ? (
            <img
              src={src}
              alt=""
              draggable={false}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          ) : (
            <FallbackFlacon />
          )}
        </div>
      </div>

      {/* ── Ground shadow ─────────────────────────────────── */}
      <div
        ref={shadowRef}
        aria-hidden
        className="pointer-events-none"
        style={{
          marginTop: 28,
          width: "62%",
          height: 22,
          borderRadius: "9999px",
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, transparent 75%)",
          filter: "blur(9px)",
          willChange: "transform, opacity",
        }}
      />

      {/* ── Caption ───────────────────────────────────────── */}
      <div
        ref={captionRef}
        className="relative mt-8 text-center"
        style={{ willChange: "opacity" }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.55em] text-[#d4af37]"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Signature Edition
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/45">
          Extrait · 30% · No. 001
        </p>
      </div>
    </div>
  );
});

export default PerfumeVisual;

/* ---------- Graceful SVG fallback ---------- */
function FallbackFlacon() {
  return (
    <svg
      viewBox="0 0 200 320"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        filter:
          "drop-shadow(0 30px 60px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(212,175,55,0.25))",
      }}
    >
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(245,230,168,0.35)" />
          <stop offset="50%" stopColor="rgba(212,175,55,0.18)" />
          <stop offset="100%" stopColor="rgba(245,230,168,0.10)" />
        </linearGradient>
        <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5e6a8" />
          <stop offset="100%" stopColor="#a07820" />
        </linearGradient>
      </defs>
      <rect x="80" y="10" width="40" height="46" rx="4" fill="url(#cap)" />
      <rect x="86" y="56" width="28" height="14" fill="#d4af37" opacity="0.8" />
      <rect
        x="90"
        y="70"
        width="20"
        height="24"
        fill="url(#glass)"
        stroke="rgba(212,175,55,0.5)"
      />
      <path
        d="M 40 94 Q 40 84 60 84 L 140 84 Q 160 84 160 94 L 168 280 Q 168 308 140 308 L 60 308 Q 32 308 32 280 Z"
        fill="url(#glass)"
        stroke="rgba(212,175,55,0.6)"
        strokeWidth="1.2"
      />
      <path
        d="M 44 160 L 156 160 L 162 280 Q 162 302 140 302 L 60 302 Q 38 302 38 280 Z"
        fill="rgba(212,175,55,0.25)"
      />
      <path
        d="M 52 110 Q 52 100 62 100 L 78 100 L 66 300 Q 60 300 56 296 Z"
        fill="rgba(255,255,255,0.15)"
      />
      <rect
        x="66"
        y="180"
        width="68"
        height="80"
        rx="2"
        fill="rgba(5,5,5,0.55)"
        stroke="rgba(212,175,55,0.7)"
      />
      <text
        x="100"
        y="212"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="14"
        fill="#f5e6a8"
        letterSpacing="2"
      >
        ALHARAM
      </text>
      <text
        x="100"
        y="232"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="9"
        fill="rgba(245,230,168,0.7)"
        letterSpacing="3"
      >
        SCENTIMENTS
      </text>
      <line x1="78" y1="242" x2="122" y2="242" stroke="rgba(212,175,55,0.6)" />
      <text
        x="100"
        y="254"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="8"
        fill="rgba(245,230,168,0.6)"
        letterSpacing="2"
      >
        NO. 001
      </text>
    </svg>
  );
}
