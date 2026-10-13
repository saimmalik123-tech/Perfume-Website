import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import useImageSequence from "../hooks/useImageSequence";
import useCanvasSequence from "../hooks/useCanvasSequence";
import usePinnedScrub from "../hooks/usePinnedScrub";

import SequencePreloader from "./SequencePreloader";
import SequenceCanvas from "./SequenceCanvas";
import ChapterText from "./ChapterText";
import ScrollHint from "./ScrollHint";
import { CHAPTERS } from "./chapters";

gsap.registerPlugin(ScrollTrigger);

export default function FragranceExperience() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const lightRef = useRef(null);
  const chapterRefs = useRef([]);

  const { images, ready, progress } = useImageSequence({
    basePath: "/frames/",
    prefix: "frame_",
    count: 120,
    pad: 4,
    ext: "jpg",
  });

  const { canvasRef, frameIndexRef, drawFrame } = useCanvasSequence(images);

  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [showHint, setShowHint] = useState(true);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (ready) {
      drawFrame(0);
      const t = setTimeout(() => setPreloaderVisible(false), 400);
      return () => clearTimeout(t);
    }
  }, [ready, drawFrame]);

  const onProgress = useCallback(
    (p) => {
      const total = images.length;
      if (!total) return;
      const idx = Math.round(p * (total - 1));
      if (idx !== frameIndexRef.current) {
        frameIndexRef.current = idx;
        drawFrame(idx);
      }
      setShowHint(p < 0.05);
    },
    [images, drawFrame, frameIndexRef],
  );

  usePinnedScrub({
    triggerRef: sectionRef,
    pinRef,
    onProgress,
    enabled: ready && !reduceMotion,
  });

  useEffect(() => {
    if (!ready || reduceMotion) return;

    const ctx = gsap.context(() => {
      CHAPTERS.forEach((chapter, i) => {
        const el = chapterRefs.current[i];
        if (!el) return;
        const [startPct, endPct] = chapter.range;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${startPct * 100}% top`,
              end: `${endPct * 100}% top`,
              scrub: true,
            },
          })
          .fromTo(
            el,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, ease: "power2.out" },
          )
          .to(el, { opacity: 0, y: -40, ease: "power2.in" }, ">0.4");
      });

      gsap.to(lightRef.current, {
        scale: 1.15,
        opacity: 0.9,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready, reduceMotion]);

  useEffect(() => {
    if (!ready || !reduceMotion) return;
    const mid = Math.floor(images.length / 2);
    frameIndexRef.current = mid;
    drawFrame(mid);
  }, [ready, reduceMotion, images, drawFrame, frameIndexRef]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#050505]"
      style={{ height: "420vh" }}
    >
      <SequencePreloader progress={progress} visible={preloaderVisible} />

      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <SequenceCanvas canvasRef={canvasRef} lightRef={lightRef} />

        {CHAPTERS.map((c, i) => (
          <ChapterText
            key={c.id}
            ref={(el) => (chapterRefs.current[i] = el)}
            layout={c.layout}
            eyebrow={c.eyebrow}
            title={c.title}
            body={c.body}
            signature={c.signature}
            titleUppercase={c.titleUppercase}
            titleColor={c.titleColor}
          />
        ))}

        <ScrollHint visible={showHint} />
      </div>
    </section>
  );
}
