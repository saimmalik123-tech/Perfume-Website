import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERIF = '"Cormorant Garamond", ui-serif, Georgia, serif';

export default function Hero() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const metaRef = useRef(null);
  const ctaRef = useRef(null);
  const hintRef = useRef(null);
  const lineTopRef = useRef(null);
  const lineBottomRef = useRef(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Intro reveal on load ---------- */
  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.35 });

      tl.from(lineTopRef.current, {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1.6,
        ease: "power3.inOut",
      })
        .from(
          eyebrowRef.current,
          { opacity: 0, y: 14, duration: 1, ease: "power3.out" },
          "-=1",
        )
        .from(
          titleRef.current.querySelectorAll(".letter"),
          {
            opacity: 0,
            y: 80,
            rotateX: -60,
            duration: 1.4,
            stagger: 0.045,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          subRef.current,
          { opacity: 0, y: 18, duration: 1.1, ease: "power3.out" },
          "-=0.9",
        )
        .from(
          metaRef.current?.children || [],
          {
            opacity: 0,
            y: 12,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.7",
        )
        .from(
          ctaRef.current?.children || [],
          {
            opacity: 0,
            y: 16,
            duration: 0.9,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .from(
          hintRef.current,
          { opacity: 0, y: 10, duration: 0.8, ease: "power2.out" },
          "-=0.4",
        )
        .from(
          lineBottomRef.current,
          {
            scaleX: 0,
            transformOrigin: "center",
            duration: 1.4,
            ease: "power3.inOut",
          },
          "-=0.9",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  /* ---------- Pinned scroll: text drifts away as bottle takes over ---------- */
  useEffect(() => {
    if (reduceMotion) return;
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(eyebrowRef.current, { opacity: 0, y: -20, duration: 0.5 }, 0)
        .to(titleRef.current, { y: -100, opacity: 0, duration: 1 }, 0)
        .to(subRef.current, { y: -60, opacity: 0, duration: 0.85 }, 0.05)
        .to(
          metaRef.current?.children || [],
          { y: -40, opacity: 0, duration: 0.7, stagger: 0.06 },
          0.1,
        )
        .to(
          ctaRef.current?.children || [],
          { y: -30, opacity: 0, duration: 0.7, stagger: 0.06 },
          0.15,
        )
        .to(hintRef.current, { opacity: 0, y: 20, duration: 0.4 }, 0)
        .to(lineBottomRef.current, { opacity: 0.2, duration: 0.6 }, 0.2);
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  /* ---------- Letter splitting for "ALHARAM" ---------- */
  const titleText = "Alharam";

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-[#050505] h-[280vh] sm:h-[320vh] lg:h-[360vh]"
    >
      {/* Pinned viewport */}
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center px-6"
      >
        {/* ambient gold glow behind text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(212,175,55,0.10), transparent 60%)",
          }}
        />

        {/* top hairline */}
        <span
          ref={lineTopRef}
          aria-hidden
          className="pointer-events-none absolute top-24 left-1/2 h-px w-40 -translate-x-1/2 sm:w-60"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)",
          }}
        />

        {/* Content */}
        <div className="relative z-20 flex w-full max-w-5xl flex-col items-center text-center">
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="mb-6 text-[10px] uppercase tracking-[0.55em] text-[#d4af37] sm:mb-8 sm:text-[11px]"
          >
            Est. Scentiments
          </p>

          {/* Title with per-letter spans */}
          <h1
            ref={titleRef}
            className="select-none"
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(64px, 14vw, 190px)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              lineHeight: 0.95,
              color: "#f5e6a8",
              textShadow:
                "0 4px 60px rgba(212,175,55,0.25), 0 2px 20px rgba(0,0,0,0.6)",
            }}
          >
            {titleText.split("").map((ch, i) => (
              <span
                key={i}
                className="letter inline-block"
                style={{ willChange: "transform, opacity" }}
              >
                {ch}
              </span>
            ))}
          </h1>

          {/* Subheading */}
          <p
            ref={subRef}
            className="mt-6 max-w-md text-[11px] uppercase tracking-[0.4em] text-white/55 sm:mt-8 sm:text-xs"
          >
            A fragrance by Muhammad Aman
          </p>

          {/* Meta row — three small stats */}
          <div
            ref={metaRef}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.35em] text-white/40 sm:mt-12 sm:gap-x-12"
          >
            <span>Eau de Parfum</span>
            <span className="hidden sm:inline opacity-40">·</span>
            <span>50ml / 100ml</span>
            <span className="hidden sm:inline opacity-40">·</span>
            <span>Karachi, PK</span>
          </div>

          {/* CTA buttons */}
          <div
            ref={ctaRef}
            className="mt-10 flex flex-col items-center gap-4 sm:mt-12 sm:flex-row sm:gap-5"
          >
            <a
              href="#experience"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-[11px] uppercase tracking-[0.35em] transition-colors duration-500"
              style={{
                color: "#050505",
                background: "linear-gradient(180deg, #f5e6a8, #d4af37)",
                boxShadow: "0 8px 40px rgba(212,175,55,0.25)",
              }}
            >
              <span className="relative z-10">Explore the scent</span>
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
              />
            </a>

            <a
              href="#story"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-white/70 transition-colors hover:text-[#f5e6a8]"
            >
              <span>The story</span>
              <span
                aria-hidden
                className="inline-block h-px w-6 origin-left transition-transform duration-500 group-hover:scale-x-150"
                style={{
                  background: "linear-gradient(90deg, #d4af37, transparent)",
                }}
              />
            </a>
          </div>
        </div>

        {/* Scroll hint at bottom */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/40 sm:text-[10px]">
            Scroll
          </p>
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
            <ArrowDown
              size={12}
              className="text-[#d4af37]"
              style={{
                animation: reduceMotion
                  ? "none"
                  : "hero-bob 2.4s ease-in-out infinite",
              }}
            />
          </span>
        </div>

        {/* bottom hairline */}
        <span
          ref={lineBottomRef}
          aria-hidden
          className="pointer-events-none absolute bottom-6 left-1/2 h-px w-40 -translate-x-1/2 sm:w-60"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)",
          }}
        />
      </div>

      <style>{`
        @keyframes hero-bob {
          0%, 100% { transform: translateY(-2px); opacity: 0.8; }
          50%      { transform: translateY(3px);  opacity: 1; }
        }
      `}</style>
    </section>
  );
}
