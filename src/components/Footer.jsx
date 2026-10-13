import { useEffect, useRef, useState } from "react";
import { Heart, Mail, MapPin, Phone, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERIF = '"Cormorant Garamond", ui-serif, Georgia, serif';

const LINK_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "#hero" },
      { label: "Story", href: "#story" },
      { label: "Experience", href: "#experience" },
      { label: "Notes", href: "#notes" },
      { label: "Craft", href: "#craft" },
    ],
  },
  {
    title: "House",
    links: [
      { label: "About", href: "#story" },
      { label: "Founder", href: "#story" },
      { label: "Journal", href: "#" },
      { label: "Stockists", href: "#" },
      { label: "Press", href: "#contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Heart, href: "#", label: "Instagram" },
  { icon: Mail, href: "mailto:hello@alharamscentiments.com", label: "Email" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const markRef = useRef(null);
  const taglineRef = useRef(null);
  const columnsRef = useRef(null);
  const newsletterRef = useRef(null);
  const bottomRef = useRef(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Top ornament line
      gsap.from(".footer-rule", {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Brand mark + tagline
      gsap.from([markRef.current, taglineRef.current], {
        opacity: 0,
        y: 40,
        duration: 1.1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 78%",
          once: true,
        },
      });

      // Link columns
      const cols = columnsRef.current?.querySelectorAll(".footer-col");
      cols?.forEach((col, i) => {
        gsap.from(col, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 72%",
            once: true,
          },
        });
      });

      // Newsletter
      gsap.from(newsletterRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 68%",
          once: true,
        },
      });

      // Bottom bar
      gsap.from(bottomRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 95%",
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-white/5 bg-[#050505]"
    >
      {/* Ambient gold light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.09), transparent 55%)",
        }}
      />

      {/* Subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 sm:pt-24 lg:px-10 lg:pt-28">
        {/* Gold ornament rule */}
        <span
          aria-hidden
          className="footer-rule mx-auto mb-16 block h-px w-40 sm:w-56"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)",
          }}
        />

        {/* Brand block */}
        <div className="text-center">
          <h2
            ref={markRef}
            className="select-none"
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(44px, 9vw, 132px)",
              lineHeight: 1,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              backgroundImage:
                "linear-gradient(120deg, #8a6d1f 0%, #d4af37 30%, #f5e6a8 50%, #d4af37 70%, #8a6d1f 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Alharam
          </h2>
          <p
            ref={taglineRef}
            className="mt-4 text-[10px] uppercase tracking-[0.6em] text-white/40 sm:text-[11px]"
          >
            Scentiments · By Muhammad Aman
          </p>
        </div>

        {/* Newsletter */}
        <div
          ref={newsletterRef}
          className="mx-auto mt-16 max-w-2xl rounded-2xl p-6 sm:mt-20 sm:p-8"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.008))",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
            }}
          />
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37]">
              The List
            </p>
            <h3
              className="mt-3"
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(20px, 2.4vw, 30px)",
                color: "#ffffff",
                letterSpacing: "0.02em",
                lineHeight: 1.15,
              }}
            >
              Private releases, sent quietly.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
              No noise. Only the moments worth remembering — new compositions,
              small batches, and private previews.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-full bg-black/40 px-5 py-3 text-sm text-white/90 placeholder-white/30 outline-none transition-all duration-300 focus:border-[#d4af37]/60 focus:bg-black/60"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            />
            <button
              type="submit"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.3em] transition-colors duration-500 whitespace-nowrap"
              style={{
                border: "1px solid rgba(212,175,55,0.55)",
                color: "#f5e6a8",
                background:
                  "linear-gradient(180deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))",
              }}
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                {subscribed ? "Subscribed" : "Subscribe"}
              </span>
              <Send
                size={13}
                className="relative z-10 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
              />
              <span
                aria-hidden
                className="absolute inset-0 -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
                style={{
                  background: "linear-gradient(180deg, #f5e6a8, #d4af37)",
                }}
              />
            </button>
          </form>

          {subscribed && (
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.35em] text-[#d4af37]">
              You are on the list.
            </p>
          )}
        </div>

        {/* Link columns */}
        <div
          ref={columnsRef}
          className="mt-20 grid grid-cols-2 gap-10 sm:mt-24 sm:grid-cols-2 md:grid-cols-4 lg:gap-12"
        >
          {/* Brand mini-column */}
          <div className="footer-col col-span-2 sm:col-span-2 md:col-span-1">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">
              Alharam Scentiments
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              A house of slow fragrance, founded by Muhammad Aman in Karachi.
              Small batches, hand-finished, and made to be remembered.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <a
                href="mailto:hello@alharamscentiments.com"
                className="flex items-center gap-3 transition-colors hover:text-[#f5e6a8]"
              >
                <Mail size={14} />
                hello@alharamscentiments.com
              </a>
              <a
                href="tel:+920000000000"
                className="flex items-center gap-3 transition-colors hover:text-[#f5e6a8]"
              >
                <Phone size={14} />
                +92 000 000 0000
              </a>
              <p className="flex items-center gap-3">
                <MapPin size={14} />
                Karachi, Pakistan
              </p>
            </div>
          </div>

          {/* Three link columns */}
          {LINK_COLUMNS.map((col) => (
            <div key={col.title} className="footer-col">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#f5e6a8]"
                    >
                      <span
                        aria-hidden
                        className="inline-block h-px w-0 origin-left transition-all duration-500 group-hover:w-4"
                        style={{
                          background:
                            "linear-gradient(90deg, #d4af37, transparent)",
                        }}
                      />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:mt-24 sm:flex-row"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 text-center sm:text-left">
            © {new Date().getFullYear()} Alharam Scentiments. All rights
            reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="group flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.55)";
                  e.currentTarget.style.color = "#f5e6a8";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(212,175,55,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 text-center sm:text-right">
            Made in Karachi
          </p>
        </div>
      </div>
    </footer>
  );
}
