import type { JSX } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal, Section } from "./ui/section";

export default function FinalCTA(): JSX.Element {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="final-cta" labelledBy="final-cta-heading">
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 px-6 py-10 text-center backdrop-blur-xl sm:px-10 sm:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.06] blur-3xl"
        />

        <Reveal>
          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/5">
              <Sparkles
                className="h-4 w-4 text-cyan-400"
                aria-hidden="true"
              />
            </div>

            <p className="mt-4 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-cyan-400">
              System ready
            </p>

            <h2
              id="final-cta-heading"
              className="mt-3 text-2xl font-black tracking-tight text-slate-50 sm:text-4xl"
            >
              Stop wondering what to do next.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Turn your goals into a system you can actually follow.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
              <motion.a
                href="/signup"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition-colors hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Get started
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </motion.a>

              <a
                href="#features"
                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-950/60 px-5 py-2.5 text-sm font-semibold text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Explore ASCND
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}