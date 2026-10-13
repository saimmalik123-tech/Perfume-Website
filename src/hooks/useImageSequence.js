import { useEffect, useRef, useState } from "react";

/**
 * Preloads a numbered image sequence.
 * @param {string} basePath   e.g. "/frames/"
 * @param {string} prefix     e.g. "frame_"
 * @param {number} count      total frames, e.g. 120
 * @param {number} pad        zero-padding width, e.g. 4
 * @param {string} ext        e.g. "jpd"
 */
export default function useImageSequence({
  basePath = "/frames/",
  prefix = "frame_",
  count = 120,
  pad = 4,
  ext = "jpg",
} = {}) {
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs = new Array(count);

    const onOne = () => {
      if (cancelled) return;
      loadedCount += 1;
      setLoaded(loadedCount);
      if (loadedCount === count) {
        imagesRef.current = imgs;
        setReady(true);
      }
    };

    for (let i = 0; i < count; i++) {
      const n = String(i + 1).padStart(pad, "0");
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.onload = onOne;
      img.onerror = onOne; // don't stall if one frame is missing
      img.src = `${basePath}${prefix}${n}.${ext}`;
      imgs[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, [basePath, prefix, count, pad, ext]);

  return {
    // eslint-disable-next-line react-hooks/refs
    images: imagesRef.current,
    loaded,
    total: count,
    ready,
    progress: totalSafe(loaded, count),
  };
}

function totalSafe(loaded, count) {
  if (!count) return 0;
  return Math.min(loaded / count, 1);
}
