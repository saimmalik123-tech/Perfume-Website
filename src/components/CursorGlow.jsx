import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Global cursor glow. Mount ONCE at your app root, e.g. inside <App />:
 *
 *   <>
 *     <CursorGlow />
 *     <RouterProvider ... />
 *   </>
 *
 * Variants: add `data-cursor="accent|text|button|hidden"` to any element
 * to change the glow's size/color while hovering it.
 */
export default function CursorGlow({
  size = 28,
  color = "rgba(0, 94, 47,0.5)",
  blend = "screen",
} = {}) {
  const dotRef = useRef(null);
  const haloRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;
    if (reduce || coarse) return;

    const dot = dotRef.current;
    const halo = haloRef.current;
    if (!dot || !halo) return;

    // Hide native cursor site-wide (optional — comment out if you want it)
    document.documentElement.classList.add("has-cursor-glow");

    gsap.set([dot, halo], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const haloX = gsap.quickTo(halo, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const haloY = gsap.quickTo(halo, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    let shown = false;

    const move = (e) => {
      const { clientX: x, clientY: y } = e;
      dotX(x);
      dotY(y);
      haloX(x);
      haloY(y);
      if (!shown) {
        shown = true;
        gsap.to([dot, halo], {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    };

    const leave = () => {
      shown = false;
      gsap.to([dot, halo], { opacity: 0, duration: 0.3, ease: "power2.out" });
    };

    const down = () =>
      gsap.to(halo, { scale: 0.75, duration: 0.25, ease: "power3.out" });
    const up = () =>
      gsap.to(halo, { scale: 1, duration: 0.35, ease: "power3.out" });

    // Hover state via delegation — no listeners per element
    const over = (e) => {
      const target = e.target.closest?.("[data-cursor]");
      const variant = target?.dataset.cursor;
      if (!variant) return;

      if (variant === "hidden") {
        gsap.to([dot, halo], { opacity: 0, duration: 0.2 });
        return;
      }
      if (variant === "text") {
        gsap.to(halo, {
          scale: 0.4,
          backgroundColor: "rgba(245,230,168,0.55)",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 3, duration: 0.3, ease: "power3.out" });
        return;
      }
      if (variant === "button") {
        gsap.to(halo, {
          scale: 2.4,
          backgroundColor: "rgba(212,175,55,0.25)",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power3.out" });
        return;
      }
      if (variant === "accent") {
        gsap.to(halo, {
          scale: 1.8,
          backgroundColor: "rgba(212,175,55,0.35)",
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };

    const out = () => {
      gsap.to(halo, {
        scale: 1,
        backgroundColor: color,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      document.documentElement.classList.remove("has-cursor-glow");
    };
  }, [color]);

  return (
    <>
      {/* Inner dot — snappy */}
      <div
        ref={dotRef}
        aria-hidden
        className="cursor-glow-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "9999px",
          background: "#f5e6a8",
          boxShadow: "0 0 12px rgba(245,230,168,0.9)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: blend,
          willChange: "transform, opacity",
        }}
      />
      {/* Outer halo — lags slightly */}
      <div
        ref={haloRef}
        aria-hidden
        className="cursor-glow-halo"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: size * 2,
          height: size * 2,
          borderRadius: "9999px",
          background: color,
          filter: "blur(14px)",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 9998,
          mixBlendMode: blend,
          willChange: "transform, opacity, background-color",
        }}
      />

      {/* Global style: hide native cursor + hide on touch */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .has-cursor-glow,
          .has-cursor-glow * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
