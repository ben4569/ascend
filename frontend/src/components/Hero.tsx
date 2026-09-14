import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import HeroDashboard from "./HeroDashboard";
import type { JSX } from "react/jsx-runtime";

const TRUST_POINTS = [
  "Free to get started",
  "Built around your goals",
  "Progress you can actually see",
] as const;

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const ITEM_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero(): JSX.Element {
  const reduce = useReducedMotion();

  return (
    <section
      id="main"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-32 pb-0 sm:pt-40"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-grid" />

        <div className="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl opacity-20" />

        <div className="absolute right-[-10%] top-40 h-[360px] w-[360px] rounded-full bg-cyan-500/20 blur-3xl opacity-20" />
      </div>

      <motion.div
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-6"
      >
        <div className="mx-auto max-w-3xl text-center">

          {/* System badge */}
          <motion.a
            variants={ITEM_VARIANTS}
            href="#compass-ai"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-xl transition-colors duration-200 hover:border-violet-500/40 hover:text-slate-100"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
            </span>

            ASCEND AI is live

            <ArrowRight className="h-3 w-3 text-slate-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-violet-400" />
          </motion.a>

          {/* Headline */}
          <motion.h1
            variants={ITEM_VARIANTS}
            id="hero-heading"
            className="mt-7 text-[2.75rem] font-extrabold leading-[1.05] sm:text-6xl lg:text-[4.5rem]"
          >
            Stop guessing.
            <br />
            <span className="text-gradient">Start progressing.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={ITEM_VARIANTS}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            ASCEND turns your goals into a personalized progression system —
            breaking big ambitions into daily quests, habits, milestones, and
            measurable progress.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={ITEM_VARIANTS}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#signup"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-950/60 transition-all duration-150 hover:-translate-y-0.5 hover:bg-violet-500 active:scale-[0.98] sm:w-auto"
            >
              Start Your Ascension

              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href="#player-profile"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/40 hover:text-white active:scale-[0.98] sm:w-auto"
            >
              <PlayCircle className="h-4 w-4 text-slate-400" />

              See Your Progression
            </a>
          </motion.div>

          {/* Benefits */}
          <motion.ul
            variants={ITEM_VARIANTS}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {TRUST_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-xs font-medium text-slate-500"
              >
                <Sparkles
                  className="h-3 w-3 text-violet-500/70"
                  aria-hidden="true"
                />

                {point}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Product visualization */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduce ? 0 : 48,
            scale: reduce ? 1 : 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 0.25,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mask-fade-b relative mt-16 sm:mt-20"
        >
          <HeroDashboard />
        </motion.div>
      </motion.div>
    </section>
  );
}