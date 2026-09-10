import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import HeroDashboard from "./HeroDashboard";
import type { JSX } from "react/jsx-runtime";

const TRUST_POINTS: readonly string[] = [
  "Free forever plan",
  "No card required",
  "12,400+ players tracked",
] as const;

export default function Hero(): JSX.Element {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="main"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-32 pb-0 sm:pt-40"
    >
      {/* Ambient depth — decorative only */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl opacity-20" />
        <div className="absolute right-[-10%] top-40 h-[360px] w-[360px] rounded-full bg-cyan-500/20 blur-3xl opacity-20" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-6"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.a
            variants={item}
            href="#compass-ai"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-xl transition-colors duration-200 hover:border-violet-500/40 hover:text-slate-100"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
            </span>
            Compass AI 2.0 is live
            <ArrowRight className="h-3 w-3 text-slate-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-violet-400" />
          </motion.a>

          <motion.h1
            variants={item}
            id="hero-heading"
            className="mt-7 text-[2.75rem] font-extrabold leading-[1.05] sm:text-6xl lg:text-[4.5rem]"
          >
            Stop guessing.
            <br />
            <span className="text-gradient">Start progressing.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            Compass turns every session into measurable progress — one honest
            profile, one adaptive plan.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <motion.a
              href="#signup"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-950/60 transition-colors duration-150 hover:bg-violet-500 sm:w-auto"
            >
              Create your free profile
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="#player-profile"
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-xl transition-colors duration-200 hover:border-violet-500/40 hover:text-white sm:w-auto"
            >
              <PlayCircle className="h-4 w-4 text-slate-400" />
              See a live profile
            </motion.a>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {TRUST_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-xs font-medium text-slate-500"
              >
                <Sparkles className="h-3 w-3 text-violet-500/70" aria-hidden="true" />
                {point}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 48, scale: reduce ? 1 : 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mask-fade-b relative mt-16 sm:mt-20"
        >
          <HeroDashboard />
        </motion.div>
      </motion.div>
    </section>
  );
}