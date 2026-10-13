import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Story", href: "#story" },
  { label: "Experience", href: "#experience" },
  { label: "Notes", href: "#notes" },
  { label: "Craft", href: "#craft" },
  { label: "Contact", href: "#contact" },
];

const SERIF = '"Cormorant Garamond", ui-serif, Georgia, serif';

export default function Header() {
  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const logoRef = useRef(null);
  const underlineRef = useRef(null);
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? y / docHeight : 0;
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: progress,
          duration: 0.15,
          ease: "power2.out",
          transformOrigin: "left center",
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        headerRef.current,
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
        },
      )
        .fromTo(
          ".nav-link",
          { y: -12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          "-=0.6",
        )
        .fromTo(
          logoRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            clearProps: "opacity",
          },
          "-=0.9",
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const strength = 10;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, {
        x: (x / rect.width) * strength,
        y: (y / rect.height) * strength,
        duration: 0.6,
        ease: "power3.out",
      });
    };
    const onLeave = () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleLinkEnter = (e) => {
    const link = e.currentTarget;
    const nav = navRef.current;
    if (!nav || !underlineRef.current) return;
    const linkRect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    gsap.to(underlineRef.current, {
      x: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleNavLeave = () => {
    if (underlineRef.current) {
      gsap.to(underlineRef.current, { opacity: 0, duration: 0.3 });
    }
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, #d4af37 40%, #f5e6a8 60%, transparent)",
          }}
        />
      </div>

      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-black/50 border-b border-white/5 py-3"
            : "py-6 border-b border-transparent"
        }`}
        style={
          !scrolled
            ? {
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0))",
              }
            : undefined
        }
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <a
            href="#hero"
            ref={logoRef}
            className="group relative flex select-none items-center gap-3"
            aria-label="Alharam Scentiments home"
          >
            <span
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/50"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(245,230,168,0.25), rgba(0,0,0,0.6))",
                boxShadow: "0 0 20px rgba(212,175,55,0.25)",
              }}
            >
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: 16,
                  color: "#f5e6a8",
                  lineHeight: 1,
                }}
              >
                A
              </span>
            </span>

            <span className="flex flex-col leading-none">
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: 20,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  backgroundImage:
                    "linear-gradient(120deg, #f5e6a8 0%, #d4af37 45%, #8a6d1f 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Alharam
              </span>
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: 10,
                  letterSpacing: "0.55em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginTop: 4,
                  transition: "color 0.4s",
                }}
                className="group-hover:!text-white/80"
              >
                Scentiments
              </span>
            </span>

            <span
              className="pointer-events-none absolute -inset-3 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)",
              }}
            />
          </a>

          <nav
            ref={navRef}
            onMouseLeave={handleNavLeave}
            className="relative hidden lg:flex items-center gap-9"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onMouseEnter={handleLinkEnter}
                className="nav-link relative text-[11px] uppercase tracking-[0.25em] text-white/75 hover:text-white transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}

            <span
              ref={underlineRef}
              className="pointer-events-none absolute -bottom-2 h-[1px] opacity-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #d4af37, transparent)",
              }}
            />
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="group relative hidden overflow-hidden rounded-full border border-[#d4af37]/50 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-[#f5e6a8] transition-colors duration-500 hover:text-black lg:inline-flex"
            >
              <span className="relative z-10">Discover</span>
              <span
                className="absolute inset-0 -translate-y-full bg-gradient-to-b from-[#f5e6a8] to-[#d4af37] transition-transform duration-500 ease-out group-hover:translate-y-0"
                aria-hidden
              />
            </a>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/85 hover:text-[#d4af37] transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.15), transparent 60%)",
          }}
        />
        <nav className="relative flex h-full flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: SERIF,
                fontSize: 30,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
                transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${
                  i * 0.06 + 0.15
                }s`,
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
