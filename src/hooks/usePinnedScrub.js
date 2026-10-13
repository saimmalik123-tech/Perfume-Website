import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins `pinRef` for the duration of `triggerRef` and calls `onProgress(0→1)`
 * on every scroll tick.
 */
export default function usePinnedScrub({
  triggerRef,
  pinRef,
  onProgress,
  scrub = 0.6,
  enabled = true,
}) {
  const progressRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    if (!triggerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const obj = { p: 0 };
      gsap.to(obj, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          progressRef.current = obj.p;
          onProgress?.(obj.p);
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [enabled, scrub, onProgress, triggerRef, pinRef]);

  return progressRef;
}
