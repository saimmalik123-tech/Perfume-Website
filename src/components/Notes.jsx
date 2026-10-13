import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERIF = '"Cormorant Garamond", ui-serif, Georgia, serif';
const SANS = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';

const NOTES = [
  {
    id: "top",
    index: "01",
    label: "Top Notes",
    subtitle: "The opening",
    time: "0 – 15 min",
    accent: "#f5e6a8",
    description:
      "The first breath — bright, quick, and gone before you notice it. A flash of citrus and spice that sets the tone.",
    items: ["Bergamot", "Pink Pepper", "Saffron"],
  },
  {
    id: "heart",
    index: "02",
    label: "Heart Notes",
    subtitle: "The character",
    time: "15 min – 3 hrs",
    accent: "#e6c86b",
    description:
      "The soul of the fragrance. This is where it decides what it wants to be — floral, resinous, unmistakably itself.",
    items: ["Damask Rose", "Oud", "Jasmine"],
  },
  {
    id: "base",
    index: "03",
    label: "Base Notes",
    subtitle: "The memory",
    time: "3 hrs – next day",
    accent: "#d4af37",
    description:
      "What remains on skin hours later. The quiet architecture of the scent — the part people remember you by.",
    items: ["Sandalwood", "Amber", "Musk"],
  },
];

export default function Notes() {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const ctx = gsap.context(() => {
      // ── Header intro ───────────────────────────────────────────────
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .from(".notes-eyebrow", { opacity: 0, y: 12, duration: 0.6 })
        .from(
          ".notes-title .line > span",
          { yPercent: 110, duration: 1, stagger: 0.09 },
          "-=0.35",
        )
        .from(".notes-lead", { opacity: 0, y: 18, duration: 0.8 }, "-=0.55");

      // ── Timeline rail grows with scroll ────────────────────────────
      gsap.fromTo(
        railRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        },
      );

      // ── Scent trail SVG draws on scroll ────────────────────────────
      const path = trailRef.current;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "bottom 75%",
            scrub: 0.8,
          },
        });
      }

      // ── Each row: number, title, description, chips ────────────────
      gsap.utils.toArray(".note-row").forEach((row) => {
        const marker = row.querySelector(".note-marker");
        const numeral = row.querySelector(".ghost-numeral");
        const label = row.querySelector(".note-label");
        const title = row.querySelector(".note-title");
        const desc = row.querySelector(".note-desc");
        const meta = row.querySelector(".note-meta");
        const chips = row.querySelectorAll(".note-chip");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 78%", once: true },
          defaults: { ease: "power3.out" },
        });

        tl.from(marker, { scale: 0, opacity: 0, duration: 0.7 })
          .from(numeral, { opacity: 0, x: -40, duration: 1.1 }, "<")
          .from(label, { opacity: 0, y: 10, duration: 0.5 }, "-=0.7")
          .from(title, { opacity: 0, y: 24, duration: 0.8 }, "-=0.35")
          .from(desc, { opacity: 0, y: 16, duration: 0.7 }, "-=0.5")
          .from(meta, { opacity: 0, y: 10, duration: 0.5 }, "-=0.45")
          .from(
            chips,
            { opacity: 0, y: 8, duration: 0.4, stagger: 0.06 },
            "-=0.4",
          );

        // Marker "lights up" once row is centered
        gsap.to(marker, {
          backgroundColor: row.dataset.accent,
          boxShadow: `0 0 0 6px ${row.dataset.accent}22, 0 0 20px ${row.dataset.accent}88`,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="notes"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] py-20 sm:py-24 lg:py-32"
    >
      {/* Ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 12% 10%, rgba(212,175,55,0.10), transparent 50%), radial-gradient(ellipse at 88% 90%, rgba(212,175,55,0.06), transparent 55%)",
        }}
      />
      {/* Top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        {/* ── Header ───────────────────────────────────────────────── */}
        <header className="max-w-3xl">
          <p className="notes-eyebrow mb-5 text-[10px] uppercase tracking-[0.55em] text-[#d4af37] sm:text-[11px]">
            The Notes
          </p>

          <h2
            className="notes-title"
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
            <span className="line block overflow-hidden">
              <span className="inline-block">Top, heart,</span>
            </span>
            <span className="line block overflow-hidden">
              <span className="inline-block">and base.</span>
            </span>
          </h2>

          <p className="notes-lead mt-6 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-8 sm:text-base">
            A fragrance is not one note but a movement — three acts unfolding
            over hours. This is how Alharam Scentiments is composed.
          </p>
        </header>

        {/* ── Editorial timeline ───────────────────────────────────── */}
        <div className="relative mt-16 sm:mt-20 lg:mt-28">
          {/* Vertical rail */}
          <div
            ref={railRef}
            aria-hidden
            className="absolute left-3.25 top-2 bottom-2 w-px sm:left-4.25"
            style={{
              background:
                "linear-gradient(180deg, rgba(212,175,55,0.65), rgba(212,175,55,0.15))",
            }}
          />

          {/* Scent trail — decorative SVG curve across the rows */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 1000 900"
            preserveAspectRatio="none"
          >
            <path
              ref={trailRef}
              d="M 120 40 C 380 180, 60 320, 320 460 S 700 620, 480 780 S 260 860, 640 880"
              fill="none"
              stroke="url(#trailGradient)"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.55"
            />
            <defs>
              <linearGradient id="trailGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5e6a8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#e6c86b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Rows */}
          <ol className="relative space-y-20 sm:space-y-24 lg:space-y-28">
            {NOTES.map((note) => (
              <li
                key={note.id}
                data-accent={note.accent}
                className="note-row group relative grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.15fr)] md:gap-x-14"
              >
                {/* Marker column */}
                <div className="relative flex flex-col items-center pt-1">
                  <span
                    className="note-marker relative z-10 h-3 w-3 rounded-full sm:h-3.5 sm:w-3.5"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.35)",
                      boxShadow: "0 0 0 0 rgba(0,0,0,0)",
                    }}
                  />
                  <span
                    aria-hidden
                    className="mt-3 hidden text-[10px] uppercase tracking-[0.35em] text-white/40 sm:block"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {note.time}
                  </span>
                </div>

                {/* Left column — numeral + title */}
                <div className="relative min-w-0 pb-2 md:pb-0">
                  {/* Ghost numeral bleeds behind */}
                  <span
                    aria-hidden
                    className="ghost-numeral pointer-events-none absolute -left-4 -top-10 select-none sm:-left-6 sm:-top-14 md:-left-10 md:-top-16"
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontSize: "clamp(72px, 12vw, 180px)",
                      lineHeight: 1,
                      color: "transparent",
                      WebkitTextStroke: `1px ${note.accent}33`,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {note.index}
                  </span>

                  <p className="note-label relative mb-3 text-[10px] uppercase tracking-[0.45em] text-[#d4af37]">
                    {note.label}
                  </p>

                  <h3
                    className="note-title relative"
                    style={{
                      fontFamily: SERIF,
                      fontSize: "clamp(28px, 4vw, 48px)",
                      color: "#ffffff",
                      letterSpacing: "0.01em",
                      lineHeight: 1.05,
                    }}
                  >
                    {note.subtitle}
                  </h3>
                </div>

                {/* Right column — description + chips */}
                <div className="col-span-2 mt-5 md:col-span-1 md:mt-1">
                  <p className="note-desc max-w-md text-sm leading-relaxed text-white/75 sm:text-[15px]">
                    {note.description}
                  </p>

                  <p className="note-meta mt-6 text-[10px] uppercase tracking-[0.45em] text-white/40">
                    Ingredients
                  </p>

                  <ul
                    role="list"
                    className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3"
                  >
                    {note.items.map((item) => (
                      <li key={item} className="note-chip">
                        <span className="relative inline-flex items-center gap-2 text-[13px] tracking-wide text-white/85">
                          <span
                            aria-hidden
                            className="h-px w-3"
                            style={{ backgroundColor: note.accent }}
                          />
                          {item}
                          {/* hover underline sweep */}
                          <span
                            aria-hidden
                            className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                            style={{
                              backgroundColor: note.accent,
                              opacity: 0.7,
                            }}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Divider hairline between rows */}
                <span
                  aria-hidden
                  className="col-span-2 mt-14 h-px w-full md:col-span-3"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(212,175,55,0.35), rgba(255,255,255,0.06) 40%, transparent)",
                  }}
                />
              </li>
            ))}
          </ol>
        </div>

        {/* ── Closing ──────────────────────────────────────────────── */}
        <footer className="notes-closing mt-16 flex flex-col items-center gap-4 sm:mt-20">
          <span
            aria-hidden
            className="block h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)",
            }}
          />
          <p
            className="text-center text-[10px] uppercase tracking-[0.45em] text-white/70"
            style={{ fontFamily: SANS }}
          >
            Composed slowly — Eau de Parfum · 22% concentration
          </p>
        </footer>
      </div>
    </section>
  );
}
