"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Audit finding Q3: route changes were instant with no visual continuity —
 * every navigation just hard-cut to the next page. A short fade-and-rise on
 * the incoming page (150-250ms, entrance-only — no exit animation, so the
 * next page never waits on the old one to finish leaving) gives that
 * continuity without adding real perceived latency.
 *
 * Keyed on pathname so each route change remounts and re-plays the
 * animation.
 *
 * Reduced-motion handling: framer-motion's own `useReducedMotion()` hook
 * caused a hydration mismatch here — it can resolve differently between the
 * server render and the client's first render, and this component used
 * that to decide whether to render the wrapping <motion.div> at all, so the
 * two trees didn't match. Fixed by always rendering the same element and
 * only ever changing animation *values* (never the DOM shape) from a
 * useEffect-driven media-query check, which starts `false` on both server
 * and first client render and only updates after mount. On a
 * reduced-motion visitor's very first page load, one negligible fade may
 * still play before that check resolves; every navigation after that is
 * correctly instant.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
