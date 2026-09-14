import type { JSX } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Compass,
  Target,
  TrendingUp,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "./ui/section";
import { cn } from "../lib/cn";

type ProofCard = {
  icon: typeof Target;
  label: string;
  title: string;
  description: string;
  accent: string;
};

const PROOF_CARDS: readonly ProofCard[] = [
  {
    icon: Target,
    label: "01 / CLARITY",
    title: "Goal → Roadmap",
    description:
      "Turn a vague ambition into a concrete progression with priorities you can actually act on.",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    icon: Compass,
    label: "02 / DIRECTION",
    title: "Plan → Action",
    description:
      "Know what deserves your attention next instead of constantly deciding what to work on.",
    accent: "from-blue-500 to-violet-500",
  },
  {
    icon: TrendingUp,
    label: "03 / MOMENTUM",
    title: "Action → Progress",
    description:
      "Make your effort visible and use your progress to understand whether the system is working.",
    accent: "from-violet-500 to-fuchsia-500",
  },
] as const;

function ProofCard({
  card,
  index,
}: {
  card: ProofCard;
  index: number;
}): JSX.Element {
  const reduceMotion = useReducedMotion();
  const Icon = card.icon;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <motion.article
        whileHover={reduceMotion ? undefined : { y: -5 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="group relative h-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-slate-700 sm:p-7"
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20",
            card.accent,
          )}
        />

        <div className="relative">
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                card.accent,
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>

            <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-slate-600">
              {card.label}
            </span>
          </div>

          <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-50">
            {card.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            {card.description}
          </p>

          <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors group-hover:text-slate-300">
            <span>Built into the system</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function WhyAscnd(): JSX.Element {
  return (
    <Section id="why-ascnd" labelledBy= "why-ascnd-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[900px] -translate-x-1/2 rounded-full bg-violet-500/[0.06] blur-3xl"
      />

      <SectionHeading
        id="why-ascnd-heading"
        eyebrow="Progress, not noise"
        title={
          <>
            Built for people who are
            <br className="hidden sm:block" /> serious about getting better.
          </>
        }
        subtitle="ASCND brings goals, planning, execution, and feedback into one connected system—so your effort compounds instead of getting lost."
      />

      <div className="relative mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
        {PROOF_CARDS.map((card, index) => (
          <ProofCard
            key={card.label}
            card={card}
            index={index}
          />
        ))}
      </div>

      <Reveal delay={0.3}>
        <div className="relative mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70 p-6 backdrop-blur-xl sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/[0.04] via-violet-500/[0.06] to-fuchsia-500/[0.04]"
          />

          <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                One connected system
              </p>

              <p className="mt-2 text-lg font-semibold tracking-tight text-slate-100">
                Goals. Compass. Execution. Progress.
              </p>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Every layer exists to answer one question:
                <span className="text-slate-300">
                  {" "}
                  what should I do next?
                </span>
              </p>
            </div>

            <div
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/5"
            >
              <Check className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}