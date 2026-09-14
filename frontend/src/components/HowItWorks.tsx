import type { JSX } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Compass,
  Target,
  TrendingUp,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "./ui/section";
import { cn } from "../lib/cn";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: typeof Target;
  accent: string;
};

const STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Define your objective",
    description:
      "Tell ASCND what you're trying to achieve, where you are now, and how much time you can realistically commit.",
    icon: Target,
    accent: "from-cyan-400 to-blue-500",
  },
  {
    number: "02",
    title: "Get your roadmap",
    description:
      "Compass turns your goal and constraints into a clear progression of priorities, actions, and milestones.",
    icon: Compass,
    accent: "from-blue-500 to-violet-500",
  },
  {
    number: "03",
    title: "Execute the system",
    description:
      "Work through focused daily actions instead of constantly deciding what to do next.",
    icon: Check,
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    number: "04",
    title: "Adapt and level up",
    description:
      "Your progress feeds the system. ASCND helps you see what's working, adjust your plan, and keep moving forward.",
    icon: TrendingUp,
    accent: "from-fuchsia-500 to-cyan-400",
  },
] as const;

function StepCard({
  step,
  index,
}: {
  step: Step;
  index: number;
}): JSX.Element {
  const reduceMotion = useReducedMotion();
  const Icon = step.icon;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <motion.article
        whileHover={reduceMotion ? undefined : { y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="group relative h-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-violet-500/40 sm:p-7"
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gradient-to-br blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-20",
            step.accent,
          )}
        />

        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                step.accent,
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>

            <span className="font-mono text-xs font-bold tracking-[0.2em] text-slate-600">
              {step.number}
            </span>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold tracking-tight text-slate-50">
              {step.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              {step.description}
            </p>
          </div>

          <div className="mt-auto pt-8">
            <div className="h-px w-full bg-slate-800/80" />
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-700 transition-colors group-hover:bg-cyan-400" />
              ASCND SYSTEM
            </div>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function HowItWorks(): JSX.Element {
  return (
    <Section id="how-it-works" labelledBy="how-it-works-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 h-80 w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/[0.06] blur-3xl"
      />

      <SectionHeading
        id="how-it-works-heading"
        eyebrow="The loop"
        title={
          <>
            Turn ambition into
            <br className="hidden sm:block" /> a system you can follow
          </>
        }
        subtitle="ASCND takes you from a vague goal to a concrete plan, then continuously turns your progress into the next move."
      />

      <div className="relative mt-16">
        <div
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-gradient-to-r from-cyan-500/0 via-violet-500/40 to-cyan-500/0 lg:block"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative">
              <StepCard step={step} index={index} />

              {index < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute -bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center text-slate-700 md:hidden"
                >
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </div>
              )}

              {index < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute right-[-13px] top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center text-slate-700 lg:flex"
                >
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Reveal delay={0.35}>
        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-slate-800/80 bg-slate-950/60 p-6 text-center backdrop-blur-xl sm:p-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">
            The result
          </p>

          <p className="mt-3 text-lg font-semibold tracking-tight text-slate-100 sm:text-xl">
            Less time wondering what to do.
            <span className="text-slate-500"> More time actually doing it.</span>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}