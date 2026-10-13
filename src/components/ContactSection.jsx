import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERIF = '"Cormorant Garamond", ui-serif, Georgia, serif';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Info column
      gsap.from(infoRef.current?.children || [], {
        opacity: 0,
        x: -30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Form fields
      gsap.from(formRef.current?.querySelectorAll(".field") || [], {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend yet — simulate success.
    // Later, plug in Formspree, Resend, or a custom API.
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] py-28 lg:py-40"
    >
      {/* Gold ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(212,175,55,0.10), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(212,175,55,0.06), transparent 55%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        {/* Left — info */}
        <div ref={infoRef} className="flex flex-col justify-center">
          <p
            className="mb-5 text-[10px] uppercase tracking-[0.5em]"
            style={{ color: "#d4af37" }}
          >
            Contact
          </p>

          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(34px, 5vw, 68px)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#f5e6a8",
              lineHeight: 1.05,
            }}
          >
            Begin a<br /> conversation
          </h2>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
            For private orders, press, or bespoke fragrance enquiries — reach
            out and we will respond personally.
          </p>

          <div className="mt-10 space-y-5">
            <ContactLine
              icon={<Mail size={16} />}
              label="Email"
              value="hello@alharamscentiments.com"
            />
            <ContactLine
              icon={<Phone size={16} />}
              label="Phone"
              value="+92 000 000 0000"
            />
            <ContactLine
              icon={<MapPin size={16} />}
              label="Studio"
              value="Karachi, Pakistan"
            />
          </div>

          <p className="mt-10 text-[10px] uppercase tracking-[0.4em] text-white/35">
            Alharam Scentiments — By Muhammad Aman
          </p>
        </div>

        {/* Right — form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative rounded-2xl p-6 sm:p-8 lg:p-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* gold hairline top */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)",
            }}
          />

          <div className="field">
            <FieldLabel>Your name</FieldLabel>
            <FieldInput name="name" placeholder="Full name" required />
          </div>

          <div className="field mt-5">
            <FieldLabel>Email</FieldLabel>
            <FieldInput
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="field mt-5">
            <FieldLabel>Subject</FieldLabel>
            <FieldInput
              name="subject"
              placeholder="Private order / Press / Other"
            />
          </div>

          <div className="field mt-5">
            <FieldLabel>Message</FieldLabel>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Tell us what you are looking for…"
              className="w-full resize-none rounded-lg bg-black/40 px-4 py-3 text-sm text-white/90 placeholder-white/25 outline-none transition-all duration-300 focus:border-[#d4af37]/60 focus:bg-black/60"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>

          <button
            type="submit"
            className="field group relative mt-8 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.3em] transition-colors duration-500"
            style={{
              border: "1px solid rgba(212,175,55,0.55)",
              color: "#f5e6a8",
              background:
                "linear-gradient(180deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))",
            }}
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
              {sent ? "Message sent" : "Send message"}
            </span>
            <Send
              size={14}
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

          {sent && (
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.35em] text-[#d4af37]">
              Thank you — we will be in touch.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function ContactLine({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <span
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{
          border: "1px solid rgba(212,175,55,0.35)",
          color: "#f5e6a8",
          background:
            "radial-gradient(circle at 30% 30%, rgba(245,230,168,0.15), rgba(0,0,0,0.5))",
        }}
      >
        {icon}
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
          {label}
        </p>
        <p className="mt-1 text-sm text-white/80">{value}</p>
      </div>
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <label className="mb-2 block text-[10px] uppercase tracking-[0.35em] text-white/45">
      {children}
    </label>
  );
}

function FieldInput(props) {
  return (
    <input
      {...props}
      className="w-full rounded-lg bg-black/40 px-4 py-3 text-sm text-white/90 placeholder-white/25 outline-none transition-all duration-300 focus:border-[#d4af37]/60 focus:bg-black/60"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
    />
  );
}
