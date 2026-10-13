import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PerfumeVisual from "./PerfumeVisual";

gsap.registerPlugin(ScrollTrigger);

const SERIF = '"Cormorant Garamond", ui-serif, Georgia, serif';

const MILESTONES = [
  {
    year: "2019",
    title: "The first accord",
    body: "Muhammad Aman begins blending in a small Karachi studio — no lab, no formula, just instinct and oud.",
  },
  {
    year: "2021",
    title: "Sourced with intention",
    body: "Direct partnerships with growers in Assam, Grasse, and Kerala. Every material traceable to its origin.",
  },
  {
    year: "2023",
    title: "A house is born",
    body: "Alharam Scentiments is named — after the stillness of the hour before dawn, when scent is most remembered.",
  },
  {
    year: "2026",
    title: "The signature edition",
    body: "The first public release. Small batch. Numbered. Made slowly, on purpose.",
  },
];

export default function Story({ perfumeSrc = "/images/perfume.png" }) {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const quoteRef = useRef(null);
  const timelineRef = useRef(null);
  const founderRef = useRef(null);

  const perfumeColRef = useRef(null);
  const perfumeAPIRef = useRef(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      /* ── Section header reveals ────────────────────────────── */
      gsap.from([eyebrowRef.current, titleRef.current], {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(leadRef.current, {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leadRef.current,
          start: "top 80%",
          once: true,
        },
      });

      /* ── Timeline rail draws on scroll ─────────────────────── */
      gsap.from(".story-line", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.6,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      /* ── Milestones rise in, staggered ─────────────────────── */
      gsap.utils.toArray(".milestone").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 44,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        gsap.from(el.querySelector(".milestone-year"), {
          opacity: 0,
          x: i % 2 === 1 ? 30 : -30,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
        gsap.from(el.querySelector(".milestone-dot"), {
          scale: 0,
          duration: 0.7,
          ease: "back.out(2.4)",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });

      /* ── Founder + quote ──────────────────────────────────── */
      gsap.from(founderRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: founderRef.current,
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(quoteRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 80%",
          once: true,
        },
      });

      /* ── Perfume cinematic timeline (desktop only) ─────────── */
      const api = perfumeAPIRef.current;
      if (perfumeColRef.current && api?.bottle) {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          gsap.from(perfumeColRef.current, {
            opacity: 0,
            x: 120,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              once: true,
            },
          });

          gsap.from(api.bottle, {
            opacity: 0,
            y: 40,
            scale: 0.9,
            duration: 1.6,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              once: true,
            },
          });

          gsap.from([api.halo, api.haloInner], {
            opacity: 0,
            scale: 0.6,
            duration: 2,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              once: true,
            },
          });

          gsap.from(api.caption, {
            opacity: 0,
            y: 16,
            duration: 1,
            delay: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              once: true,
            },
          });

          const scrollTL = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });

          scrollTL
            .fromTo(
              api.bottle,
              { yPercent: -8, scale: 1, rotate: -1.2 },
              { yPercent: 8, scale: 1.05, rotate: 1.2, ease: "none" },
              0,
            )
            .fromTo(
              api.reflect,
              { opacity: 0.12, scaleY: 0.9 },
              { opacity: 0.3, scaleY: 1.02, ease: "none" },
              0,
            )
            .fromTo(
              api.halo,
              { opacity: 0.35, scale: 0.92 },
              { opacity: 0.7, scale: 1.08, ease: "none" },
              0,
            )
            .fromTo(
              api.haloInner,
              { opacity: 0.25, scale: 0.9 },
              { opacity: 0.55, scale: 1.05, ease: "none" },
              0,
            )
            .fromTo(
              api.shadow,
              { scaleX: 0.7, opacity: 0.3 },
              { scaleX: 1, opacity: 0.55, ease: "none" },
              0,
            )
            .fromTo(
              api.sweep,
              { yPercent: -20 },
              { yPercent: 20, ease: "none" },
              0,
            );

          gsap.utils.toArray(".milestone").forEach((el) => {
            gsap.fromTo(
              api.sweep,
              { xPercent: -140, opacity: 0 },
              {
                xPercent: 140,
                opacity: 1,
                duration: 1.6,
                ease: "power2.inOut",
                scrollTrigger: {
                  trigger: el,
                  start: "top 75%",
                  toggleActions: "play none none none",
                },
              },
            );
          });

          gsap.to(api.sweep, {
            filter: "brightness(1.35)",
            duration: 2.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        return () => mm.revert();
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] py-24 sm:py-32 lg:py-40"
    >
      {/* Ambient light layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 15%, rgba(212,175,55,0.08), transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(212,175,55,0.05), transparent 55%)",
        }}
      />

      {/* ── Desktop perfume column (sticky) ───────────────────── */}
      <div
        ref={perfumeColRef}
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[42%] max-w-[600px] lg:block xl:right-6"
      >
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <PerfumeVisual ref={perfumeAPIRef} src={perfumeSrc} alt="" />
        </div>
      </div>

      {/* ── Foreground content — reserving right gutter on lg+ ── */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 lg:pr-[44%] xl:pr-10">
        <div className="max-w-3xl">
          <p
            ref={eyebrowRef}
            className="mb-5 text-[10px] uppercase tracking-[0.55em] text-[#d4af37] sm:text-[11px]"
          >
            The Story
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
            Born from stillness,
            <br />
            worn with intention.
          </h2>

          <p
            ref={leadRef}
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:mt-8 sm:text-base"
          >
            Alharam Scentiments was founded on a simple idea — that fragrance
            should be remembered, not merely worn. Every bottle begins as a
            quiet study of a single material, then grows into something
            unmistakable.
          </p>
        </div>

        {/* Quote */}
        <div
          ref={quoteRef}
          className="relative mt-20 max-w-3xl sm:mt-24 lg:mt-32"
        >
          <span
            aria-hidden
            className="absolute -left-3 -top-6 select-none sm:-left-6 sm:-top-10"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(90px, 12vw, 140px)",
              color: "rgba(212,175,55,0.18)",
              lineHeight: 0.8,
            }}
          >
            "
          </span>
          <p
            className="pl-4 sm:pl-10"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(20px, 2.6vw, 32px)",
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.88)",
              fontStyle: "italic",
            }}
          >
            A fragrance is a letter you write to someone you have not yet met.
            Everything in this house begins with that sentence.
          </p>
          <p className="mt-5 pl-4 text-[11px] uppercase tracking-[0.4em] text-[#d4af37] sm:pl-10">
            — Muhammad Aman, Founder
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mt-24 sm:mt-32 lg:mt-40">
          {/* Rail: centered on the dot at every breakpoint */}
          <span
            aria-hidden
            className="story-line absolute top-0 h-full w-px"
            style={{
              left: "13.5px",
              background:
                "linear-gradient(180deg, transparent, rgba(212,175,55,0.6) 15%, rgba(212,175,55,0.6) 85%, transparent)",
            }}
          />
          {/* Center rail on sm+ via a media-query-less trick: a second element
              is unnecessary — the same rail is offset via inline style + a
              class that shifts it at sm. Instead, use two spans for clarity. */}
          <span
            aria-hidden
            className="story-line absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 sm:block"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(212,175,55,0.6) 15%, rgba(212,175,55,0.6) 85%, transparent)",
            }}
          />

          <ul className="space-y-16 sm:space-y-24">
            {MILESTONES.map((m, i) => {
              const isRight = i % 2 === 1;
              return (
                <li
                  key={m.year}
                  className="milestone relative grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12"
                >
                  {/* Dot — sits on the rail at every breakpoint */}
                  <span
                    aria-hidden
                    className="milestone-dot absolute top-[6px] h-3 w-3 -translate-x-1/2 rounded-full left-[13.5px] sm:left-1/2"
                    style={{
                      background: "#d4af37",
                      boxShadow:
                        "0 0 0 4px rgba(5,5,5,1), 0 0 24px rgba(212,175,55,0.7)",
                    }}
                  />

                  <div
                    className={`pl-10 sm:pl-0 ${
                      isRight
                        ? "sm:order-2 sm:pl-16 sm:text-left"
                        : "sm:pr-16 sm:text-right"
                    }`}
                  >
                    <p
                      className="milestone-year"
                      style={{
                        fontFamily: SERIF,
                        fontSize: "clamp(28px, 3.4vw, 44px)",
                        color: "#f5e6a8",
                        letterSpacing: "0.06em",
                        lineHeight: 1,
                      }}
                    >
                      {m.year}
                    </p>
                    <h3 className="mt-3 text-[11px] uppercase tracking-[0.4em] text-white/85">
                      {m.title}
                    </h3>
                  </div>

                  <div
                    className={`pl-10 sm:pl-0 ${
                      isRight
                        ? "sm:order-1 sm:pr-16 sm:text-right"
                        : "sm:pl-16 sm:text-left"
                    }`}
                  >
                    <p
                      className={`max-w-md text-sm leading-relaxed text-white/55 sm:max-w-sm ${
                        isRight ? "sm:mr-auto" : "sm:ml-auto"
                      }`}
                    >
                      {m.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Founder card */}
        <div ref={founderRef} className="relative mt-24 sm:mt-32 lg:mt-40">
          {/* Top hairline — full-bleed rule framing the spread */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-8 h-px sm:-top-12"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.45) 20%, rgba(212,175,55,0.45) 80%, transparent)",
            }}
          />

          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-14 lg:gap-20">
            {/* ── Left column: monogram seal + vertical rule ───────── */}
            <div className="relative flex flex-col items-center sm:items-start">
              {/* Vertical rule running beside the seal */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 sm:left-[110px] sm:translate-x-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(212,175,55,0.0), rgba(212,175,55,0.35) 30%, rgba(212,175,55,0.35) 70%, rgba(212,175,55,0.0))",
                }}
              />

              <div className="relative">
                {/* Rotating outer ring */}
                <span
                  aria-hidden
                  className="founder-ring pointer-events-none absolute -inset-3 rounded-full"
                  style={{
                    border: "1px dashed rgba(212,175,55,0.35)",
                  }}
                />
                {/* Static inner ring + monogram */}
                <div
                  className="relative flex h-28 w-28 items-center justify-center rounded-full sm:h-32 sm:w-32"
                  style={{
                    border: "1px solid rgba(212,175,55,0.55)",
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(245,230,168,0.14), rgba(0,0,0,0.45))",
                  }}
                >
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontSize: "clamp(34px, 4vw, 46px)",
                      color: "#f5e6a8",
                      lineHeight: 1,
                      letterSpacing: "0.04em",
                    }}
                  >
                    MA
                  </span>
                </div>
              </div>

              {/* Under-seal caption */}
              <p className="mt-5 text-center text-[9px] uppercase tracking-[0.55em] text-white/35 sm:text-left">
                Est. 2019 · Karachi
              </p>
            </div>

            {/* ── Right column: signature block ───────────────────── */}
            <div className="relative text-center sm:text-left">
              {/* Oversized watermark numeral bleeding right */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-20 hidden select-none sm:block lg:-right-10 lg:-top-28"
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(160px, 20vw, 260px)",
                  lineHeight: 1,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(212,175,55,0.10)",
                  letterSpacing: "-0.04em",
                }}
              >
                MA
              </span>

              <p className="relative text-[10px] uppercase tracking-[0.5em] text-[#d4af37]">
                Founder
              </p>

              <h3
                className="relative mt-4"
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(30px, 4.2vw, 56px)",
                  color: "#ffffff",
                  letterSpacing: "0.02em",
                  lineHeight: 1.05,
                  fontWeight: 400,
                }}
              >
                Muhammad Aman
              </h3>

              {/* Small accent rule under the name */}
              <span
                aria-hidden
                className="mx-auto mt-6 block h-px w-20 sm:mx-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,0.85), rgba(212,175,55,0))",
                }}
              />

              <p className="relative mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-[15px]">
                Trained as a perfumer between Karachi and Grasse, Aman built
                Alharam Scentiments around a single discipline — to make fewer
                fragrances, and to make each one worthy of memory.
              </p>

              {/* Signature line — italic serif, "draws" on scroll */}
              <p
                className="founder-signature relative mt-8"
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  color: "rgba(245,230,168,0.75)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.2,
                }}
              >
                — Muhammad Aman
              </p>

              {/* Meta row — separated by fine hairlines instead of dots */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[10px] uppercase tracking-[0.4em] text-white/45 sm:justify-start">
                <span>Perfumer</span>
                <span
                  aria-hidden
                  className="hidden h-3 w-px sm:inline-block"
                  style={{ background: "rgba(212,175,55,0.5)" }}
                />
                <span>Founder</span>
                <span
                  aria-hidden
                  className="hidden h-3 w-px sm:inline-block"
                  style={{ background: "rgba(212,175,55,0.5)" }}
                />
                <span>Karachi, PK</span>
              </div>
            </div>
          </div>

          {/* Bottom hairline — closes the spread */}
          <div
            aria-hidden
            className="pointer-events-none mt-16 h-px w-full sm:mt-20"
            style={{
              background:
                "linear-gradient(90deg, rgba(212,175,55,0.45), rgba(212,175,55,0.15) 60%, transparent)",
            }}
          />

          {/* Local animation: ring rotates, signature underline draws */}
          <style>{`
    @keyframes founderRingSpin {
      to { transform: rotate(360deg); }
    }
    .founder-ring {
      animation: founderRingSpin 40s linear infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .founder-ring { animation: none; }
    }
  `}</style>
        </div>
      </div>
    </section>
  );
}
