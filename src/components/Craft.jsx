import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERIF = '"Cormorant Garamond", ui-serif, Georgia, serif';

const STATS = [
  { value: "22", label: "Percent concentration" },
  { value: "48", label: "Ingredients traced" },
  { value: "7", label: "Months of maceration" },
  { value: "120", label: "Bottles per batch" },
];

const PILLARS = [
  {
    title: "Sourced by hand",
    body: "Oud from Assam. Rose from Grasse. Sandalwood from Mysore. Each material selected at origin, never through a middleman.",
  },
  {
    title: "Blended in silence",
    body: "Every accord is built slowly, then left to rest. No shortcuts, no synthetic filler. Just patience and pressure.",
  },
  {
    title: "Finished by hand",
    body: "Each bottle is filled, sealed, and numbered in the Lahore studio. The wax seal is pressed once — imperfect by design.",
  },
];

export default function Craft() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const statsRef = useRef(null);
  const pillarsRef = useRef(null);
  const closingRef = useRef(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.from([eyebrowRef.current, titleRef.current, leadRef.current], {
        opacity: 0,
        y: 40,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Stats counting + fade-in
      const statEls = statsRef.current?.querySelectorAll(".stat");
      statEls?.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });

      // Pillars
      const pillarEls = pillarsRef.current?.querySelectorAll(".pillar");
      pillarEls?.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 1.1,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        });
      });

      // Closing line
      gsap.from(closingRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: closingRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Gold line draws across the section
      gsap.from(".craft-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.6,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 lg:py-40"
    >
      {/* Ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 10%, rgba(212,175,55,0.08), transparent 55%), radial-gradient(ellipse at 75% 90%, rgba(212,175,55,0.05), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <p
            ref={eyebrowRef}
            className="mb-5 text-[10px] uppercase tracking-[0.55em] text-[#d4af37] sm:text-[11px]"
          >
            Craftsmanship
          </p>

          <h2
            ref={titleRef}
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(34px, 6vw, 82px)",
              lineHeight: 1.05,
              letterSpacing: "0.04em",
              color: "#f5e6a8",
              textTransform: "uppercase",
            }}
          >
            Made slowly,
            <br />
            on purpose.
          </h2>

          <p
            ref={leadRef}
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:mt-8 sm:text-base"
          >
            There are faster ways to make a fragrance. We ignore them. Every
            Alharam bottle is the result of a deliberate, unhurried process —
            from raw material to final seal.
          </p>
        </div>

        {/* Gold rule */}
        <span
          aria-hidden
          className="craft-rule mt-16 block h-px w-full sm:mt-20"
          style={{
            background:
              "linear-gradient(90deg, rgba(212,175,55,0.5), rgba(212,175,55,0.08), transparent)",
          }}
        />

        {/* Stats strip */}
        <div
          ref={statsRef}
          className="mt-12 grid grid-cols-2 gap-8 sm:mt-16 sm:grid-cols-4 sm:gap-10"
        >
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(38px, 5vw, 64px)",
                  color: "#f5e6a8",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                {s.value}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-white/45">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div
          ref={pillarsRef}
          className="mt-20 grid grid-cols-1 gap-6 sm:mt-24 sm:gap-8 lg:grid-cols-3 lg:gap-10"
        >
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="pillar group relative overflow-hidden rounded-2xl p-7 transition-colors duration-700 sm:p-9"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-6 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent)",
                }}
              />

              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(22px, 2.6vw, 30px)",
                  color: "#ffffff",
                  letterSpacing: "0.02em",
                  lineHeight: 1.15,
                }}
              >
                {p.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-white/55">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div ref={closingRef} className="mt-24 text-center sm:mt-32 lg:mt-40">
          <p
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(24px, 3.2vw, 44px)",
              lineHeight: 1.25,
              color: "#f5e6a8",
              letterSpacing: "0.03em",
              maxWidth: "26ch",
              marginInline: "auto",
            }}
          >
            “Any house can bottle a scent. Few can bottle a memory.”
          </p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.45em] text-white/40">
            Alharam Scentiments — By Muhammad Aman
          </p>
        </div>
      </div>
    </section>
  );
}
